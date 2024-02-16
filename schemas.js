export const typeDefs = `#graphql
    type Game {
      id:ID,
      title:String,
      platform:[String]
    }

    type Query {
      games:[Game]
    }
`;
