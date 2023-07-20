import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import prisma from './prisma/prismaClient'; // Import the Prisma Client
import dotenv from 'dotenv';
const app = express();
// Load environment variables from the .env file
dotenv.config();

// The GraphQL schema
const typeDefs = `#graphql
type Questionnaire {
  id: Int
  title: String
  pages: [Page]
}

type Page {
  id: Int
  title: String
  inputs: [Input]
  conditionalNavigation: ConditionalNavigation
}

type Input {
  id: Int
  type: String
  label: String
  name: String
  required: Boolean
  options: [String]
  recommendationValue: String
  condition: ConditionalCheck
}

type ButtonInput {
  id: Int
  type: String
  label: String
  action: String
  condition: ConditionalCheck
}

type ConditionalNavigation {
  id: Int
  conditions: [ConditionalCheck]
  targetPageId: Int
}

type ConditionalCheck {
  id: Int
  type: String
  sourceQuestion: String
  requiredValue: String
}

type Query {
  getQuestionnaireConfig: Questionnaire
}
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    getQuestionnaireConfig: async () => {
      const pages = await prisma.page.findMany({});
      return { pages };
    },
  },
};

async function main() {
  const httpServer = http.createServer(app);
  // Define a simple route for testing
  app.get('/helloworld', (req, res) => {
    res.send('Hello, world!');
  });
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(cors(), bodyParser.json(), expressMiddleware(server));
  await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, () => {
      resolve(undefined);
    }),
  );
  console.log(`🚀 Server ready at http://localhost:4000`);
}

main();
export { app };
