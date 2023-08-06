import { Question } from '@prisma/client';
import { getRecommendation } from '../../algorithm/recommend-algorithm';
import prisma from '../../prisma/prismaClient'; // Import the Prisma Client
import { User, UserResponses, UserResponsesInput } from '../../types/types';

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
    getAllUsers: async () => {
      const users = await prisma.user.findMany({});
      return users;
    },
    getAllResponses: async () => {
      const responses = await prisma.userResponses.findMany({});
      return responses;
    },
  },
  Mutation: {
    createUserResponses: async (
      _parent: any,
      args: { responsesData: UserResponsesInput },
    ) => {
      const userresponses = await prisma.userResponses.create({
        data: {
          userId: args.responsesData.userId,
          responses: args.responsesData.responses,
        },
      });
      // Get matrix recommendation result here
      const recommendedColor: string = await getRecommendation({
        userId: args.responsesData.userId,
        responses: userresponses.responses as any,
      });
      return recommendedColor;
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
      const user = await prisma.user.create({
        data: {
          userName: args.userName,
        },
      });
      return user;
    },
    deleteAllQuestionResponses: async () => {
      try {
        await prisma.userResponses.deleteMany({});
        return true;
      } catch (error) {
        console.error('Error deleting question responses:', error);
      }
    },
  },
};

export { resolvers };
