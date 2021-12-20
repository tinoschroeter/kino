import cheerio from "cheerio";
import axios from "axios";
import * as iso88592 from "iso-8859-2";
import { MongoClient } from "mongodb";

const url = `https://www.abaton.de/page.pl?prog`;
const tmdbAPI = "https://api.themoviedb.org/3";
const tmdbAPIKey = process.env.TMDB_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const list = new Set();

const add2db = async (data) => {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const database = client.db(MONGODB_DB);
    const collection = database.collection(MONGODB_COLLECTION);

    const query = { title: data.title };
    const find = await collection.findOne(query);

    const now = Date.now();
    if (find === null) {
      const result = await collection.insertOne(data);
      const updateTime = await collection.updateOne(
        { _id: result.insertedId },
        { $set: { added: now } }
      );
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } else {
      const result = await collection.updateOne(
        { _id: find._id },
        { $set: { updated: now } }
      );
    }
  } finally {
    await client.close();
  }
};

axios
  .get(url, { responseType: "arraybuffer", responseEncoding: "binary" })
  .then((response) => {
    const data = iso88592.decode(response.data.toString("binary"));
    let $ = cheerio.load(data);

    $(".prg_titl").each((i, e) => {
      const titel = e.children[0].data;
      if (titel !== "Sneak Preview" && !titel.match(/arte Kurzfilmnacht*/))
        list.add(titel);
    });

    const movieList = [];
    const result = Array.from(list);

    result.map((item) => {
      const movie = item.replace(/ /g, "%20");
      axios
        .get(`${tmdbAPI}/search/movie?api_key=${tmdbAPIKey}&query=${movie}`)
        .then((response) => {
          const data = response.data.results[0];
          if (data) {
            axios
              .get(
                `${tmdbAPI}/movie/${data.id}/videos?api_key=${tmdbAPIKey}&language=en-US`
              )
              .then((response) => {
                const video = response.data.results[0];
                if (video !== undefined && video.site === "YouTube") {
                  data.video = video.key;
                  add2db(data);
                }
              });
          }
        });
    });
  })
  .catch((err) => console.log(err));
