import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas";
import db from "./_db";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true, // see below for more about this
  cache: "bounded",
  cors: {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.log("Server ready at port", 8000);
