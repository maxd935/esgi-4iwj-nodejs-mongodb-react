const express = require("express");
require("./lib/mongo");

const UserRouter = require("./routes/user");
const ProductRouter = require("./routes/product");

const app = express();
const PORT = process.env.PORT || 3000;
// API RESTFULL
// Format de l'url
// - /users : Opérations sur la liste des utilisateurs
// - /users/:id : Opérations sur un utilisateur
// - /users/:id/vehicules : Opérations sur la liste des véhicules d'un utilisateur
// - /users/:id/vehicules/:id : Opérations sur un véhicule d'un utilisateur

// Retour
// GET /users : Retourne la liste des utilisateurs
// - 200 : OK
// GET /users/:id : Retourne l'utilisateur dont l'id est passé en paramètre
// - 200 : OK
// - 404 : Not Found
// POST /users : Crée un utilisateur
// - 201 : Created
// - 400 : Bad Request
// PUT /users/:id : Modifie un utilisateur
// - 200 : OK
// - 400 : Bad Request
// - 404 : Not Found
// DELETE /users/:id : Supprime un utilisateur
// - 204 : Not Content
// - 404 : Not Found
app.use(express.json());

app.use("/users", UserRouter);
app.use("/products", ProductRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
