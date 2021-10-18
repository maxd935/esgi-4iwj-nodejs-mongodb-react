const fs = require("fs");

const filePath = "./access.log";

fs.access(filePath, fs.constants.R_OK, (err) => {
  if (err) {
    console.log("File not found");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log("File read error");
      return;
    }
    console.log(
      data
        .toString()
        .split("\n")
        .map((line) => {
          return line.match(
            /(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}) +(?<verb>GET|POST|PUT|DELETE) +(?<code>\d{3}) +(?<uri>.*)/
          ).groups;
        })
    );
  });
});
