import { Question, QuestionResponseModel } from '@prisma/client';
import { getRecommendation } from '../../algorithm/recommend-algorithm';
import prisma from '../../prisma/prismaClient'; // Import the Prisma Client
import { User, UserResponses } from '../../types/types';

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    getUserResponsesById: async (
      _parent: any,
      userResponses: UserResponses,
    ) => {
      const userresponses = await prisma.userResponses.findUnique({
        where: { responseId: userResponses.responseId },
      });
      return userresponses;
    },
  },
  Mutation: {
    createUserResponses: async (_parent: any, args: UserResponses) => {
      const userresponses = await prisma.userResponses.create({
        data: {
          userId: args.user.userId,
          responses: args.responses as any,
        },
      });
      //get matrix factorization result here
      // const recommendedColor = await getRecommendation({
      //   user: args.user,
      //   responses: userresponses,
      // });
      // console.log('Recommended Color:', recommendedColor);
      return userresponses;
    },
    createQuestion: async (_parent: any, args: { question: Question }) => {
      const question = await prisma.question.create({
        data: {
          questionId: args.question.questionId,
          label: args.question.label,
          type: args.question.type,
          options: args.question.options,
          minValue: args.question.minValue,
          maxValue: args.question.maxValue,
        },
      });
      return question;
    },
    createUser: async (_parent: any, args: User) => {
      const userresponses = await prisma.user.create({
        data: {
          userName: args.userName,
        },
      });
      return userresponses;
    },
  },
};

export { resolvers };
