import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(
  "mongodb://Gagan:gagan@ac-mavkp7c-shard-00-00.fkloojo.mongodb.net:27017,ac-mavkp7c-shard-00-01.fkloojo.mongodb.net:27017,ac-mavkp7c-shard-00-02.fkloojo.mongodb.net:27017/?ssl=true&replicaSet=atlas-rac2wk-shard-0&authSource=admin&appName=Cluster0",
);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn:false
  },
});
