import type {
  QueryResolvers,
  MutationResolvers,
  PizzaRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const pizzas: QueryResolvers['pizzas'] = () => {
  requireAuth({ roles: ['admin'] })
  return db.pizza.findMany()
}

export const pizza: QueryResolvers['pizza'] = ({ id }) => {
  return db.pizza.findUnique({
    where: { id },
  })
}

export const createPizza: MutationResolvers['createPizza'] = ({ input }) => {
  requireAuth({ roles: ['admin'] })
  return db.pizza.create({ data: input, })
}

export const updatePizza: MutationResolvers['updatePizza'] = ({
  id,
  input,
}) => {
  requireAuth({ roles: ['admin'] })
  return db.pizza.update({
    data: input,
    where: { id },
  })
}

export const deletePizza: MutationResolvers['deletePizza'] = ({ id }) => {
  requireAuth({ roles: ['admin'] })
  return db.pizza.delete({
    where: { id },
  })
}

export const Pizza: PizzaRelationResolvers = {
  orders: (_obj, { root }) => {
    return db.pizza.findUnique({ where: { id: root?.id } }).orders()
  },
}
