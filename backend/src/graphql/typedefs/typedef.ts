// The GraphQL schema
const typeDefs = `#graphql
type Questionnaire {
  id: Int
  title: String
  pages: JSON
}
scalar JSON
type Query {
  questionnaires: [Questionnaire]
  questionnaireById (questionnaireId: Int!): Questionnaire
}
type Mutation {
  createQuestionnaire(id: Int!, title: String!, pages: JSON!): Questionnaire
}
`;

export { typeDefs };
