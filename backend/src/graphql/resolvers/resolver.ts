import { Question } from '@prisma/client';
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
          responseId: args.responseId,
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
    addQuestion: async (_parent: any, args: Question) => {
      const question = await prisma.question.create({
        data: {
          questionId: args.questionId,
          label: args.label,
          type: args.type,
          options: args.options,
          minValue: args.minValue,
          maxValue: args.maxValue,
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
