import cheerio from "cheerio";
import axios from "axios";

import tmdb from "./util/tmdb.js";
const list = [];

const url =
  "https://www.kinofans.com/kinoprogramm/Hamburg/CinemaxX+Dammtor-kino-30695-Uebersicht.htm";

axios
  .get(url, { responseType: "arraybuffer", responseEncoding: "binary" })
  .then((response) => {
    let $ = cheerio.load(response.data);

    $("div").each((i, e) => {
      const titel = e.children[0]?.data;
      const result = /^[a-zA-Z]/.test(titel);
      if (
        titel !== undefined &&
        result &&
        !titel.match(/Anzeige/) &&
        !titel.match(/KINOFANS.com/) &&
        !titel.match(/KinoFans.com/) &&
        !titel.match(/Neue Filme im Kino/) &&
        !titel.match(/(OV)/) &&
        !titel.match(/ 3D/) &&
        !titel.match(/MediaAgenten GbR 2010*/)
      ) {
        list.push(titel);
      }
    });
    tmdb(list, "dammtor");
  });
