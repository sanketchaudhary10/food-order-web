export const schema = gql`
  type OrderTopping {
    id: Int!
    order: Order!
    orderId: Int!
    topping: Topping!
    toppingId: Int!
  }

  type Query {
    orderToppings: [OrderTopping!]! @requireAuth
    orderTopping(id: Int!): OrderTopping @requireAuth
  }

  input CreateOrderToppingInput {
    orderId: Int!
    toppingId: Int!
  }

  input UpdateOrderToppingInput {
    orderId: Int
    toppingId: Int
  }

  type Mutation {
    createOrderTopping(input: CreateOrderToppingInput!): OrderTopping!
      @requireAuth
    updateOrderTopping(
      id: Int!
      input: UpdateOrderToppingInput!
    ): OrderTopping! @requireAuth
    deleteOrderTopping(id: Int!): OrderTopping! @requireAuth
  }
`
