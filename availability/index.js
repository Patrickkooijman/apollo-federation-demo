import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { availabilities } from "../data.js";

const port = 4003;

const typeDefs = gql`
  type Availability {
    isAvailable: Boolean
  }

  extend type Product @key(fields: "id") {
    id: ID! @external
    sku: String @external
    availability: Availability
  }
`;

const resolvers = {
  Product: {
    id: ({ sku }) => sku,
    availability: ({ id }) => availabilities.find(av => av.sku === id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Availability service ready at ${url}`);
});
