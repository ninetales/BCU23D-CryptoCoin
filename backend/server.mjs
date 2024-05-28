import express from "express";
import Blockchain from "./models/Blockchain.mjs"
import PubNubServer from "./pubnubServer.mjs"
import blockchainRouter from "./routes/blockchain-routes.mjs"
import blockRouter from "./routes/block-routes.mjs"
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const credentials = {
  publishKey: process.env.PUBLISH_KEY,
  subscribeKey: process.env.SUBSCRIBE_KEY,
  secretKey: process.env.SECRET_KEY,
  userId: process.env.USER_ID,
}

export const blockchain = new Blockchain();
export const pubnubServer = new PubNubServer({ blockchain, credentials });


const app = express();
app.use(express.json());

app.use("/api/v1/blockchain", blockchainRouter)
app.use("/api/v1/block", blockRouter)

const PORT_DEFAULT = 4001;
let PORT_NODE;

if (process.env.CREATING_DYNAMIC_PORT === 'true') {
  PORT_NODE = PORT_DEFAULT + Math.ceil(Math.random() * 1000);
}

const PORT = PORT_NODE || PORT_DEFAULT;

app.listen(PORT, () => {
    console.log(`Application currently running on port: ${PORT}`);
})