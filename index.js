import express from "express"
import { expressMiddleware } from "@apollo/server/express4"
import axios from "axios"
import cors from "cors"
import { ApolloServer } from "@apollo/server"

const app = express();
app.use(express.json());
app.use(cors());

const typeDefs=`
    type todo {
        id: ID!
        title: String!
        completed: Boolean!
    }

    type posts{
        body:String!
    }

    type Query {
        getTodo: [todo],
        getPosts:[posts]
    }`;

const resolvers={
    Query:{
        getTodo:async()=>{
            const response =await axios.get('https://jsonplaceholder.typicode.com/todos');
            return response.data;
        },

        getPosts:async()=>{
            const resp= await axios.get('https://jsonplaceholder.typicode.com/posts');
            return resp.data;
        }
    }
}
const server=new ApolloServer({typeDefs,resolvers});
await server.start();

app.use('/graphql',expressMiddleware(server));

app.listen(4000,()=>{
    console.log("listed at 4000");
})