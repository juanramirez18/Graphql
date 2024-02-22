import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose"
import {typeDefs} from "./graphql/typeDefs.js"
import {resolvers}  from "./graphql/resolvers.js";
import {startStandaloneServer} from "@apollo/server/standalone"
import dotenv from "dotenv/config"




//Apollo-server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const connectDb = async()=>{
    try {
        const db = await mongoose.connect(process.env.DB_MONGO)
        const url = `${db.connection.host}: ${db.connection.port}`
        console.log("database connection sucessful:", url)
    } catch (error) {
        console.log(error)
    }
};

connectDb()

const {url} = await startStandaloneServer(server, {
    listen:{port:4000}
});

console.log("Server online in port:", url)