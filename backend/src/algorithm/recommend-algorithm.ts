import { QuestionResponseModel } from '../types/types';

function getRecommendation(userResponses: {
  userId: number;
  responses: QuestionResponseModel[];
}): string {
  // Mocking a responses initially for training purpose
  // This need to taken from DB based on actual user responses
  // For sake of demo initializing with random data
  // Rows : Users
  // Column : Responses
  const RESPONSES: number[][] = [
    [0.1, 0.2, 3, 0, 0, 0.1],
    [0, 0, 0, 0.4, 0.5, 0.2],
    [0.3, 0.2, 0, 1, 0, 0.3],
    [0, 0, 0, 0, 0, 0.4],
    [0, 0, 0.2, 0, 0.1, 0.5],
  ];
  const questionIds: number[] = [];
  // Separate loop for creating questionIds array
  for (const response of userResponses.responses) {
    const questionId = response.question.questionId;
    if (!questionIds.includes(questionId)) {
      questionIds.push(questionId);
    }
  }
  // Initialize R matrix with null values
  for (let i = 0; i < userResponses.responses.length; i++) {
    const userIdx = userResponses.userId;
    const response = userResponses.responses[i];
    const questionId = response.question.questionId;
    const questionIdx = questionIds.indexOf(questionId);
    if (!RESPONSES[userIdx]) {
      RESPONSES[userIdx] = new Array(questionIds.length).fill(null);
    }
    RESPONSES[userIdx][questionIdx] = Number.isNaN(parseFloat(response.answer))
      ? Math.random()
      : parseFloat(response.answer);
  }
  // We can use libraries like SVD or Alternating Least Squares (ALS) for matrix factorization
  // Get the predicted user-item interactions from the factorized matrices
  const predictedInteractions: number[][] =
    matrixFactorizationAlgorithm(RESPONSES);
  // Now, find the color to recommend based on the predicted interactions
  // This is just an example, we may have our own logic based on the predicted values
  const colorOptions = ['Red', 'Green', 'Blue', 'Yellow', 'Black']; // Example color options
  const maxInteractionIdx = predictedInteractions[userResponses.userId].indexOf(
    Math.max(...predictedInteractions[userResponses.userId]),
  );
  return colorOptions[maxInteractionIdx];
}

function matrixFactorizationAlgorithm(
  RESPONSES: any,
  numFeatures = 5,
  learningRate = 0.001,
  iterations = 100,
) {
  const numRows = RESPONSES.length;
  const numCols = RESPONSES[1].length;
  // Randomly initialize user and question embeddings
  let userEmbeddings = new Array(numRows)
    .fill(Math.random())
    .map(() => new Array(numFeatures).fill(Math.random()));
  let questionEmbeddings = new Array(numCols)
    .fill(Math.random())
    .map(() => new Array(numFeatures).fill(Math.random()));
  // Perform matrix factorization using gradient descent
  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (RESPONSES[i][j] !== null) {
          const prediction = predictRating(
            userEmbeddings[i],
            questionEmbeddings[j],
          );
          const error = RESPONSES[i][j] - prediction;
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
