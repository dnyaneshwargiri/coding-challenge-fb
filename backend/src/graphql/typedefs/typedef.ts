// The GraphQL schema
const typeDefs = `#graphql

type QuestionResponseModel {
  id: Int!
  question: Question!
  answer: String!
  userResponses: UserResponses
}

type Question {
  questionId: Int!
  type: String
  label: String
  options: [String]
  minValue: Int
  maxValue: Int
  questionResponseModel: [QuestionResponseModel]
}

type Recommendation {
  id: Int!
  value: String!
  weight: Int!
}

type User {
  userId: Int!
  userName: String!
  userResponses: [UserResponses]
}

type UserResponses {
  responseId: Int!
  user: User!
  responses: [QuestionResponseModel]
}

type Query {
  getUser(userId: Int!): User
  getUserResponsesById(responseId: Int!): UserResponses
}

type Mutation {
  addUser(userName: String!): User!
  addQuestion(question: Question!): Question!
  addUserResponses(responses: UserResponses): UserResponses
}
`;

export { typeDefs };
