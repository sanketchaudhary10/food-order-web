export const schema = gql`
  type Pizza {
    id: Int!
    name: String!
    price: Float!
    orders: [Order]!
  }

  type Query {
    pizzas: [Pizza!]! @requireAuth
    pizza(id: Int!): Pizza @requireAuth
  }

  input CreatePizzaInput {
    name: String!
    price: Float!
  }

  input UpdatePizzaInput {
    name: String
    price: Float
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza! @requireAuth
    updatePizza(id: Int!, input: UpdatePizzaInput!): Pizza! @requireAuth
    deletePizza(id: Int!): Pizza! @requireAuth
  }
`
