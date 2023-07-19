import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import prisma from './prisma/prismaClient'; // Import the Prisma Client
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();
// The GraphQL schema
const typeDefs = `#graphql
  type Page {
    id: Int!
    title: String!
    json: JSON!
  }

  scalar JSON

  type Query {
    pages: [Page!]!
    pageById(id: Int!): Page
  }

  type Mutation {
    createPage(title: String!, json: JSON!): Page!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    pages: async () => {
      return prisma.page.findMany();
    },
    pageById: async (_, { id }) => {
      return prisma.page.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createPage: async (_, { title, json }) => {
      return prisma.page.create({ data: { title, json } });
    },
  },
};

async function main() {
  const app = express();
  const httpServer = http.createServer(app);

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
