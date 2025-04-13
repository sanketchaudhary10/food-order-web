export const schema = gql`
  type Topping {
    id: Int!
    name: String!
    orders: [OrderTopping]!
  }

  type Query {
    toppings: [Topping!]! @requireAuth
    topping(id: Int!): Topping @requireAuth
  }

  input CreateToppingInput {
    name: String!
  }

  input UpdateToppingInput {
    name: String
  }

  type Mutation {
    createTopping(input: CreateToppingInput!): Topping! @requireAuth
    updateTopping(id: Int!, input: UpdateToppingInput!): Topping! @requireAuth
    deleteTopping(id: Int!): Topping! @requireAuth
  }
`
