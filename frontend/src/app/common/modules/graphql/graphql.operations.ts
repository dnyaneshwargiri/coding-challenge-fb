import { gql } from "apollo-angular";

const POST_QUESTION_RESPONSES = gql`
  mutation CreateUserResponses($userResponse: CreateUserResponsesInput!) {
    createUserResponses(responsesData: $userResponse)
  }
`;

export { POST_QUESTION_RESPONSES };
