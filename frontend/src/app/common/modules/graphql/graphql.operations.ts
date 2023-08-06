import { gql } from "apollo-angular";

const POST_QUESTION_RESPONSES = gql`
  mutation SubmitFormData($input: FormDataInput!) {
    submitFormData(input: $input) {
      recommendedColor
    }
  }
`;

export { POST_QUESTION_RESPONSES };
