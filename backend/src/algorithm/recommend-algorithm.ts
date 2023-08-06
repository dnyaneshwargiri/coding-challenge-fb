import { QuestionResponseModel, User } from '../types/types';

function getRecommendation(userResponses: {
  user: User;
  responses: QuestionResponseModel[];
}): string {
  // Create a matrix `R` based on user responses
  // In this example, we assume responses have numerical values for simplicity
  const R: number[][] = [];
  const questionIds: number[] = []; // Keep track of questionIds for later indexing

  for (const response of userResponses.responses) {
    const userIdx = userResponses.user.userId;
    const questionIdx = questionIds.indexOf(response.question.questionId);
    if (questionIdx === -1) {
      questionIds.push(response.question.questionId);
    }
    if (!R[userIdx]) {
      R[userIdx] = new Array(questionIds.length).fill(0);
    }
    R[userIdx][questionIdx] = parseInt(response.answer); // Convert to numerical value if needed
  }
  // Perform matrix factorization using any suitable library or custom implementation
  // We can use libraries like SVD or Alternating Least Squares (ALS) for matrix factorization
  // Get the predicted user-item interactions from the factorized matrices
  const predictedInteractions: number[][] = matrixFactorizationAlgorithm(R);
  // Now, find the color to recommend based on the predicted interactions
  // This is just an example, you may have your own logic based on the predicted values
  const colorOptions = ['Red', 'Green', 'Blue', 'Yellow', 'Black']; // Example color options
  const maxInteractionIdx = predictedInteractions[
    userResponses.user.userId
  ].indexOf(Math.max(...predictedInteractions[userResponses.user.userId]));
  return colorOptions[maxInteractionIdx];
}

function matrixFactorizationAlgorithm(
  R: any,
  numFeatures = 5,
  learningRate = 0.001,
  iterations = 100,
) {
  const numRows = R.length;
  const numCols = R[0].length;
  // Randomly initialize user and question embeddings
  let userEmbeddings = new Array(numRows)
    .fill(0)
    .map(() => new Array(numFeatures).fill(0));
  let questionEmbeddings = new Array(numCols)
    .fill(0)
    .map(() => new Array(numFeatures).fill(0));
  // Perform matrix factorization using gradient descent
  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (R[i][j] !== null) {
          const prediction = predictRating(
            userEmbeddings[i],
            questionEmbeddings[j],
          );
          const error = R[i][j] - prediction;

          for (let k = 0; k < numFeatures; k++) {
            userEmbeddings[i][k] +=
              learningRate * (2 * error * questionEmbeddings[j][k]);
            questionEmbeddings[j][k] +=
              learningRate * (2 * error * userEmbeddings[i][k]);
          }
        }
      }
    }
  }
  // Predict the interactions for each user
  const predictedInteractions = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    predictedInteractions[i] = new Array(numCols);
    for (let j = 0; j < numCols; j++) {
      predictedInteractions[i][j] = predictRating(
        userEmbeddings[i],
        questionEmbeddings[j],
      );
    }
  }

  return predictedInteractions;
}

// Predict rating using dot product of user and question embeddings
function predictRating(userEmbedding: any, questionEmbedding: any) {
  return userEmbedding.reduce(
    (sum: any, value: any, idx: any) => sum + value * questionEmbedding[idx],
    0,
  );
}

export { getRecommendation };
