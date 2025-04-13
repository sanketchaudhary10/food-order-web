export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    invitedBy: Int
    isInvited: Boolean!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input InviteUserInput {
    email: String!
    invitedBy: Int
  }

  input AcceptInviteInput {
  token: String!
  name: String!
  password: String!
}

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    inviteUser(input: InviteUserInput!): User! @requireAuth
    acceptInvite(input: AcceptInviteInput!): User! @skipAuth
  }
`
