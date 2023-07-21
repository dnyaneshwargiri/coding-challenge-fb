import { gql } from "apollo-angular";

const questionnaireId = 1; //Example Questionnarie

const GET_QUESTIONNARIES = gql`
  query GetQuestionnaires {
    questionnaires {
      id
      title
      pages
    }
  }
`;
const GET_QUESTIONNARIE_BY_ID = gql`
  query GetQuestionnaireById {
    questionnaireById(questionnaireId: ${questionnaireId}) {
      id
      title
      pages
    }
  }
`;

export { GET_QUESTIONNARIES, GET_QUESTIONNARIE_BY_ID };
