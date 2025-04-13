import type {
  QueryResolvers,
  MutationResolvers,
  OrderToppingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const orderToppings: QueryResolvers['orderToppings'] = () => {
  return db.orderTopping.findMany()
}

export const orderTopping: QueryResolvers['orderTopping'] = ({ id }) => {
  return db.orderTopping.findUnique({
    where: { id },
  })
}

export const createOrderTopping: MutationResolvers['createOrderTopping'] = ({
  input,
}) => {
  return db.orderTopping.create({
    data: input,
  })
}

export const updateOrderTopping: MutationResolvers['updateOrderTopping'] = ({
  id,
  input,
}) => {
  return db.orderTopping.update({
    data: input,
    where: { id },
  })
}

export const deleteOrderTopping: MutationResolvers['deleteOrderTopping'] = ({
  id,
}) => {
  return db.orderTopping.delete({
    where: { id },
  })
}

export const OrderTopping: OrderToppingRelationResolvers = {
  order: (_obj, { root }) => {
    return db.orderTopping.findUnique({ where: { id: root?.id } }).order()
  },
  topping: (_obj, { root }) => {
    return db.orderTopping.findUnique({ where: { id: root?.id } }).topping()
  },
}
