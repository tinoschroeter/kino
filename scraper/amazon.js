import cheerio from "cheerio";
import axios from "axios";

import tmdb from "./util/tmdb.js";

const list = [];
const url =
  "https://www.kinofans.com/Streaming/Amazon-Prime-Video/Der-Blick-aufs-Amazon-Prime-Video-Programm-E105933.htm";

axios
  .get(url, { responseType: "arraybuffer", responseEncoding: "binary" })
  .then((response) => {
    let $ = cheerio.load(response.data);

    $("strong").each((i, e) => {
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
          .replace(/ - Staffel [0-9]/, "")
          .replace(/\([^)]*[a-zA-Z]*\)/, "")
          .replace(/\[OV\]/, "")
          .replace(/\[dt.OV\]/, "")
          .trim();
        list.push(stripeTitel);
      }
    });
    tmdb(list, "amazon");
  });
