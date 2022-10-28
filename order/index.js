import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { orders } from "../data.js";

const port = 4002;

const typeDefs = gql`
  type Query {
    orders: [Order]
  }

  type Order @key(fields: "id") {
    id: ID!
    items: [Item]
    availableProducts: [Product] @requires(fields: "items { product { sku availability { isAvailable } } }")
  }
  
  type Item {
    product: Product
    amount: Int
  }
  
  extend type Product @key(fields: "id", resolvable: false ) {
    id: ID!
    sku: String @external
    availability: Availability
  }
  
  extend type Availability {
    isAvailable: Boolean @external
  }
`;

const resolvers = {
  Order: {
    availableProducts(order) {
      const items = order.items.filter(i => i.product.availability.isAvailable)

      return items.map(i => ({ id: i.product.sku, sku: i.product.sku }));
    },
  },
  Item: {
    product: i => ({ id: i.sku }),
  },
  Query: {
    orders: () => orders,
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Orders service ready at ${url}`);
});
