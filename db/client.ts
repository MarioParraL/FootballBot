import { MongoClient } from "mongodb";

import { ArticleDB } from "../types.ts";

const url = Deno.env.get("MONGO_URL");
if (!url) {
  throw new Error("MONGO_URL is not set");
}

const client = new MongoClient(url);
await client.connect();

const db = client.db("ArticulosDB");
const ArticulosCollection = db.collection<ArticleDB>("articulos");

export default ArticulosCollection;
