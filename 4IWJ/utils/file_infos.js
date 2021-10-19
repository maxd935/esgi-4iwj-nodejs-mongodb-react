// Lire un fichier donné en paramètre. Celui-ci peut être de format JSON, CSV.
// Le but du script étant de lire le fichier, détecter le nombre de lignes de données
// et ressortir les différents nom de colonnes
// Format attendu:
//      Nombre de lignes détecté: 4
//      Nombre de colonnes détecté: 5
//      Colonnes: id, nom, address, dob, email
const fs = require("fs/promises");
const path = require("path");
const { constants } = require("fs");

const filePath = process.argv[2];
const extensionOption = "." + process.argv[3].toLowerCase();

//const filePath = "./test.csv";

const pngHeaderBuffer = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
//buffer.slice(0, 8).compare(pngHeaderBuffer) === 0)
const jpegHeaderBuffer = Buffer.from([0xff, 0xd8]);
//buffer.slice(0, 2).compare(jpegHeaderBuffer) === 0)

(async () => {
  try {
    await fs.access(filePath, constants.R_OK);
    const buffer = await fs.readFile(filePath);
    const extension = extensionOption ?? guessExtension(filePath, buffer);
    let result = {
      lines: 0,
      columns: 0,
      columnsNames: [],
    };
    switch (extension) {
      case ".json":
        result = parseJSON(buffer);
        break;
      case ".csv":
        result = parseCSV(buffer);
        break;
    }
    console.log("Nombre de lignes: " + result.lines);
    console.log("Nombre de colonnes: " + result.columns);
    console.log("Colonnes: " + result.columnsNames);
  } catch (err) {
    console.error(err);
  }
})();

function parseJSON(buffer) {
  const json = buffer.toString();
  const jsonObj = JSON.parse(json);
  const lines = jsonObj.length;
  const columnsNames = Object.keys(jsonObj[0]);
  const columns = columnsNames.length;
  return { lines, columns, columnsNames };
}

function parseCSV(buffer) {
  const csv = buffer.toString();
  const lines = csv.split("\n");
  const columnsNames = lines[0].split(";");
  const columns = columnsNames.length;
  return { lines: lines.length - 1, columns, columnsNames };
}

function guessExtension(filePath, buffer) {
  if (buffer.slice(0, 8).compare(pngHeaderBuffer) === 0) {
    return ".png";
  }
  if (buffer.slice(0, 2).compare(jpegHeaderBuffer) === 0) {
    return ".jpg";
  }
  //const extension = "." + filePath.split(".").pop(); // json|csv
  return path.extname(filePath);
}
