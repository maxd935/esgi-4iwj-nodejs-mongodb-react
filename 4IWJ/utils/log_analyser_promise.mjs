import fs from "fs/promises";
import { constants } from "fs";

const filePath = "./access.log";

try {
  await fs.access(filePath, constants.R_OK);
  let data = await fs.readFile(filePath);
  data = data
    .toString()
    .split("\n")
    .map((line) => {
      return line.match(
        /(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}) +(?<verb>GET|POST|PUT|DELETE) +(?<code>\d{3}) +(?<uri>.*)/
      ).groups;
    });
  console.log(data);
} catch (err) {
  console.error(err);
}

//fs.access(filePath, constants.R_OK)
//  .then(() => fs.readFile(filePath))
//  .then((data) =>
//    data
//      .toString()
//      .split("\n")
//      .map((line) => {
//        return line.match(
//          /(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}) +(?<verb>GET|POST|PUT|DELETE) +(?<code>\d{3}) +(?<uri>.*)/
//        ).groups;
//      })
//  )
//  .then((data) => console.log(data))
//  .catch((err) => console.error(err));
