import cheerio from "cheerio";
import * as iso88592 from "iso-8859-2";
import axios from "axios";

import tmdb from "./util/tmdb.js";

const url = "https://www.abaton.de/page.pl?prog";
const list = new Set();

axios
  .get(url, { responseType: "arraybuffer", responseEncoding: "binary" })
  .then((response) => {
    const data = iso88592.decode(response.data.toString("binary"));
    let $ = cheerio.load(data);

    $(".prg_titl").each((i, e) => {
      const titel = e.children[0]?.data;
      const result = /^[a-zA-Z]/.test(titel);
      if (
        titel !== undefined &&
        result &&
        !titel.match(/Sneak Preview/) &&
        !titel.match(/arte Kurzfilmnacht*/)
      ) {
        list.add(titel);
      }
    });
    tmdb(Array.from(list), "abaton");
    console.log(Array.from(list));
  });
