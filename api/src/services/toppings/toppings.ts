import type {
  QueryResolvers,
  MutationResolvers,
  ToppingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const toppings: QueryResolvers['toppings'] = () => {
  return db.topping.findMany()
}

export const topping: QueryResolvers['topping'] = ({ id }) => {
  return db.topping.findUnique({
    where: { id },
  })
}

export const createTopping: MutationResolvers['createTopping'] = ({
  input,
}) => {
  return db.topping.create({
    data: input,
  })
}

export const updateTopping: MutationResolvers['updateTopping'] = ({
  id,
  input,
}) => {
  return db.topping.update({
    data: input,
    where: { id },
  })
}

export const deleteTopping: MutationResolvers['deleteTopping'] = ({ id }) => {
  return db.topping.delete({
    where: { id },
  })
}

export const Topping: ToppingRelationResolvers = {
  orders: (_obj, { root }) => {
    return db.topping.findUnique({ where: { id: root?.id } }).orders()
  },
}
