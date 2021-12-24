import translate from "translate";
import fs from "fs";

translate.engine = "deepl";
translate.key = process.env.DEEPL_KEY;

fs.readFile("./translate.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  translate(data, { from: "de", to: "en" }).then((result) =>
    console.log(result)
  );
});
