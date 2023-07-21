import prisma from '../../prisma/prismaClient'; // Import the Prisma Client
import { createQuestionnaireInput } from '../../types/types';

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    questionnaires: async () => {
      const questionnairies = await prisma.questionnaire.findMany();
      return questionnairies;
    },
    questionnaireById: async (_parent: any, questionnaireId: number) => {
      const questionnaire = await prisma.questionnaire.findUnique({
        where: { id: questionnaireId },
      });
      return questionnaire;
    },
  },
  Mutation: {
    createQuestionnaire: async (
      _parent: any,
      args: createQuestionnaireInput,
    ) => {
      const questionnaire = await prisma.questionnaire.create({
        data: {
          id: args.id,
          title: args.title,
          pages: args.pages,
        },
      });
      return questionnaire;
    },
  },
};

export { resolvers };
