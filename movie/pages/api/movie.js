import nextConnect from "next-connect";
import middleware from "../../middleware/database.js";

const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  let time = Date.now();
  time = time - 60 * 60 * 7000;

  const query = { updated: { $gt: time } }; // not older then 7 hours
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
