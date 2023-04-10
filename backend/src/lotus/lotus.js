import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
import dotenv from "dotenv";
dotenv.config();
const endpointUrl = "http://127.0.0.1:1234/rpc/v0";
const LOTUS_TOKEN = process.env.LOTUS_TOKEN;
const provider = new NodejsProvider(endpointUrl, {
  token: LOTUS_TOKEN,
});
export const client = new LotusRPC(provider, { schema: mainnet.fullNode });
