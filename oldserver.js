const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }

  type Mutation {
    addUser(input: UserInput!): User
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  input UserInput {
    username: String!
    email: String!
  }
`);

// In-memory storage for simplicity (replace this with a database in a real application)
const users = [];

// The root provides resolver functions for each API endpoint
const root = {
  hello: () => {
    return "Hello world! my name is tushar rawat";
  },
  addUser: ({ input }) => {
    const newUser = {
      id: String(users.length + 1),
      username: input.username,
      email: input.email,
    };
    users.push(newUser);
    return newUser;
  },
};

const app = express();

// Use cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`,
  );
});
