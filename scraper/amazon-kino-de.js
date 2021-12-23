import cheerio from "cheerio";
import axios from "axios";

import tmdb from "./util/tmdb.js";

const list = [];
const url =
  "https://www.kino.de/filme/stream/provider/amazon-prime/page/1/";

axios
  .get(url, { responseType: "arraybuffer", responseEncoding: "binary" })
  .then((response) => {
    let $ = cheerio.load(response.data);

    $(".product-slide-headline").each((i, e) => {
      const titel = e.children[0]?.data;
      const result = /^[a-zA-Z]/.test(titel);
      if (
        titel !== undefined &&
        result &&
        !titel.match(/Anzeige/) &&
        !titel.match(/KINOFANS.com*/) &&
        !titel.match(/Neue Filme im Kino/) &&
        !titel.match(/MediaAgenten GbR 2010*/) &&
        !titel.match(/\([a-zA-Z]+\)/) &&
        !titel.match(/die wichtigsten Kinostädte*/)
      ) {
        const stripeTitel = titel
          .replace(/\([^)]*[a-zA-Z]*\)/, "")
          .replace(/ – /, " ")
          .replace(/ - Staffel [0-9]/, "")
          .trim();
        list.push(stripeTitel);
      }
    });
    tmdb(list, "amazon");
  });
