import { gql } from "apollo-angular";

const POST_QUESTION_RESPONSES = gql`
  mutation createUserResponses( $responses: UserResponses!) {
    createUserResponses(responses: $responses) {
      responses : responses
    }
  }
`;

export { POST_QUESTION_RESPONSES };
