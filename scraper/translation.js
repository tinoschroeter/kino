import translate from "translate";

translate.engine = "deepl";
translate.key = process.env.DEEPL_KEY;

const text = await translate(
  "ich liebe italienisch",
  { from: "de", to: "it" }
);
console.log(text);
