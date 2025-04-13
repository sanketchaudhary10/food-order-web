export const schema = gql`
  type Order {
    id: Int!
    user: User!
    userId: Int!
    pizza: Pizza!
    pizzaId: Int!
    createdAt: DateTime!
    toppings: [OrderTopping]!
  }

  type Query {
    orders: [Order!]! @requireAuth
    order(id: Int!): Order @requireAuth
  }

  input CreateOrderInput {
    userId: Int!
    pizzaId: Int!
  }

  input UpdateOrderInput {
    userId: Int
    pizzaId: Int
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order! @requireAuth
    updateOrder(id: Int!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: Int!): Order! @requireAuth
  }
`
