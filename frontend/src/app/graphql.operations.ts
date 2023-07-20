import { gql } from "apollo-angular";

const GET_QUESTIONNARIE = gql`
  query GetQuestionnarie {
    questionnaire {
      id
      title
      pages
    }
  }
`;

export { GET_QUESTIONNARIE };
