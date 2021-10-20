const Scrapper = require("../utils/scrapper");
const Buffer = require("buffer");

new Scrapper({
  url: "https://graph.facebook.com/me",
  headers: {
    //Authorization: "Basic " + Buffer.from("user:password").toString("base64"),
    Authorization: "Bearer dekozfjioezjoezjicezofhoze",
  },
  processData: (data) =>
    data.Search.map((movie) => ({
      title: movie.Title,
      imdbID: movie.imdbID,
    })),
})
  .getData()
  .then((movies) => console.log(movies));
