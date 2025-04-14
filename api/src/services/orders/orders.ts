import type {
  QueryResolvers,
  MutationResolvers,
  OrderRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { generateOrderReceipt } from 'src/lib/pdfGenerator'
import { user } from '../users/users'


export const orders: QueryResolvers['orders'] = () => {
  return db.order.findMany()
}

export const order: QueryResolvers['order'] = ({ id }) => {
  return db.order.findUnique({
    where: { id },
  })
}

export const createOrder: MutationResolvers['createOrder'] = ({ input }) => {
  return db.order.create({
    data: input,
  })
}

export const updateOrder: MutationResolvers['updateOrder'] = ({
  id,
  input,
}) => {
  return db.order.update({
    data: input,
    where: { id },
  })
}

export const deleteOrder: MutationResolvers['deleteOrder'] = ({ id }) => {
  return db.order.delete({
    where: { id },
  })
}

export const createOrderWithToppings: MutationResolvers['createOrderWithToppings'] = async ({
  pizzaId,
  userId,
  toppingIds,
}) => {
  const order = await db.order.create({
    data: {
      pizza: { connect: { id: pizzaId } },
      user: { connect: { id: userId } },
      toppings: {
        create: toppingIds.map((id) => ({
          topping: { connect: { id } },
        })),
      },
    },
    include: {
      pizza: true,
      user: true,
      toppings: { include: { topping: true } },
    },
  })

  const receiptBuffer = await generateOrderReceipt(order)

  if (!receiptBuffer) {
    console.error('❌ PDF buffer is null or undefined!')
  }
  
  console.log(`PDF Receipt generated for Order #${order.id} (${receiptBuffer.length} bytes)`)

  return {
    id: order.id,
    pdfBase64: receiptBuffer?.toString('base64') || '', // 🛡️ fallback to empty string
  }
}



export const Order: OrderRelationResolvers = {
  user: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).user()
  },
  pizza: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).pizza()
  },
  toppings: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).toppings()
  },
}
