// The GraphQL schema
const typeDefs = `#graphql

type QuestionResponseModel {
  id: Int!
  question: Question!
  answer: String!
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
}

input CreateQuestionInput {
  questionId: Int!
  type: String!
  label: String!
  options: [String]
  minValue: Int
  maxValue: Int
}

input CreateUserResponsesInput {
  userId: Int!
  responses: [JSON]!
}
type UserResponses {
  responseId: Int!
  user: User!
  responses: [JSON]!
}
scalar JSON
scalar RecommendationOutput

input QuestionResponseInput {
  questionId: Int!
  answer: String!
}

type Query {
  getAllUsers : [User]
  getUserResponsesById(responseId: Int!): UserResponses
  getAllResponses: [UserResponses]
}

type Mutation {
  createUser(userName: String!): User!
  createQuestion(question: CreateQuestionInput!): Question!
  createUserResponses (responsesData: CreateUserResponsesInput!): RecommendationOutput!
  deleteAllQuestionResponses: Boolean!
}
`;

export { typeDefs };
