const http = require("http");
const https = require("https");
const { JSDOM } = require("jsdom");

module.exports = class Scrapper {
  constructor({ url, processData, ...options }) {
    this.url = url;
    this.protocol = url.startsWith("https") ? https : http;
    this.processData = processData;
    this.options = options;
  }

  getData() {
    return new Promise((res, rej) => {
      this.protocol
        .request(this.url, this.options, (response) => {
          if (response.statusCode >= 400) {
            rej(response.statusCode);
            return;
          }
          let data = [];
          response.on("data", (chunk) => {
            data.push(chunk);
          });
          response.on("end", () => {
            data = Buffer.concat(
              data,
              data.reduce((acc, cur) => acc + cur.length, 0)
            );
            if (response.headers["content-type"].includes("application/json")) {
              data = JSON.parse(data);
            }
            if (response.headers["content-type"].includes("text/html")) {
              data = new JSDOM(data).window.document;
            }
            res(this.processData(data));
          });
        })
        .end();
    });
  }
};
