import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { products } from "../data.js";

const port = 4001;

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    sku: String
    name: String
  }
`;

const resolvers = {
  Product: {
    __resolveReference({ id }) {
      const p = products.find(p => p.id === id);
      return {
        ...p,
        id: p.sku
      };
    }
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Products service ready at ${url}`);
});
