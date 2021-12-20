import nextConnect from "next-connect";
import middleware from "../../../middleware/database.js";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  const { option } = req.query;

  let time = Date.now();

  if (option && typeof +option === "Number") {
    time = time - 60 * 60 * option;
  } else {
    time = time - 60 * 60 * 1000;
  }

  const query = { updated: { $gt: time } };
  const options = {
    sort: { vote_average: -1 }, // ascending = 1, descending = -1
    projection: { _id: 0 }, // remove _id
  };

  const doc = await req.db
    .collection(MONGODB_COLLECTION)
    .find(query, options)
    .toArray();
  res.json(doc);
});
export default handler;
