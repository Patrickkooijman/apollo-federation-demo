import {ApolloGateway, IntrospectAndCompose} from "@apollo/gateway";
import { ApolloServer } from "apollo-server";

const port = 4000;

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs:
        [
          { name: "products", url: "http://localhost:4001" },
          { name: "order", url: "http://localhost:4002" },
          { name: "availability", url: "http://localhost:4003" },
        ],
  }),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({ port }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
