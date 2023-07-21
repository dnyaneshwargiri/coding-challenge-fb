import { gql } from "apollo-angular";

const GET_QUESTIONNARIE = gql`
  query GetQuestionnarie {
    Questionnaire {
      id
      title
      pages
    }
  }
`;

export { GET_QUESTIONNARIE };
