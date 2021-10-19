const http = require("http");

const request = http.request(
  "http://www.omdbapi.com/?apikey=6565fb34&s=star+wars",
  (res) => {
    let data = [];
    // Get the data
    res.on("data", (chunk) => {
      data.push(chunk);
    });

    res.on("end", () => {
      data = Buffer.concat(
        data,
        data.reduce((acc, curr) => acc + curr.length, 0)
      );

      // Decode the data
      if (res.headers["content-type"].includes("/json")) {
        data = JSON.parse(data.toString());
      }
      if (res.headers["content-type"].includes("/html")) {
        // parse the html
      }
      if (res.headers["content-type"].includes("/xml")) {
        // parse the xml
      }

      // Process the data
      data = data.Search.map((movie) => {
        return {
          title: movie.Title,
          imdbID: movie.imdbID,
        };
      });

      // Print the data
      console.log(data);
    });
  }
);

request.end();
