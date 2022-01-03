import { GraphQLServer, PubSub } from "graphql-yoga";
import * as db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import Message from "./resolvers/Message";
import ChatBox from "./resolvers/ChatBox";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
const mongo = () => {
  dotenv.config();
  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!!");
    process.exit(1);
  }
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => {
    throw new Error("DBConnectionError" + error);
  });
  db.once("open", () => {
    console.log("MongoDB connected!");
  });
};
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});
mongo();
server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
