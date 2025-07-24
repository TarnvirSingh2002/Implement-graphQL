import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";
import cors from "cors";
import { ApolloServer } from "@apollo/server";

const app = express();
app.use(express.json());
app.use(cors());

//graphQl saves our band width
//it prevent from underfetching and overfetching

const typeDefs = `
  type Post {
    id: ID,
    body: String!
  }

  type Todo {
    id: ID!
    title: String!
    userId:ID!
    post: Post
  }

  type Query {
    getTodo: [Todo]
    getPosts: [Post]
    getTodoById(id: ID!): Todo
  }
`;

const resolvers = {
  Query: {
    getTodo: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      return response.data;
    },
    getPosts: async () => {
      const resp = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return resp.data;
    },
    getTodoById: async (parent, { id }) => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return response.data;
    }
  },
  Todo: {
    post: async (parent) => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${parent.userId}`);
      return res.data;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use("/graphql", expressMiddleware(server));

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000/graphql");
});