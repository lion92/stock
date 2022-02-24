var todo = require("../model/stcock");

module.exports = {
  //////////////////////////////Personne//////////////////////////////////////////////////
  configure: function (app) {
    app.post("/registerPersonne", function (req, res) {
      todo.reqgisterPersonne(
        req.body.nom,
        req.body.prenom,
        req.body.age,
        req.body.ville,
        req.body.numero,
        req.body.adresse,
        req.body.codePostale,
        req.body.email,
        req,
        res
      );
    });
    app.get("/selectPersonne/:email", function (req, res) {
      todo.selectPersonne(req.params.email, req, res);
    });
    app.get("/selectPersonnes", function (req, res) {
      todo.selectPersonnes(req, res);
    });
    app.put("/updatePersonne", function (req, res) {
      todo.updatePersonne(
        req.body.nom,
        req.body.prenom,
        req.body.age,
        req.body.ville,
        req.body.numero,
        req.body.adresse,
        req.body.codePostale,
        req.body.email,
        req.body.idPersonne,
        req,
        res
      );
    });
    app.delete("/deletePersonne/:idPersonne", function (req, res) {
      todo.deletePeronne(req.params.idPersonne, req, res);
    });

    /////////////////////////////////Categorie//////////////////////////

    app.get("/selectCategories", function (req, res) {
      todo.selectCategories(req, res);
    });

    app.put("/updateCategorie", function (req, res) {
      todo.updateCetegorie(
        req.body.nom,
        req.body.type,
        req.body.idCategorie,
        req,
        res
      );
    });

    app.delete("/deleteCategorie/:idCategorie", function (req, res) {
      todo.deleteCategorie(req.params.idCategorie, req, res);
    });
    ////////////////////////////////////////////////Produit///////////////////////////////////////////
    app.get("/selectProduits", function (req, res) {
      todo.selectProduits(req, res);
    });

    app.put("/updateProduit", function (req, res) {
      todo.updateProduit(
        req.body.idCategorie,
        req.body.prix,
        req.body.stock,
        req.body.nom,
        req.body.idProduit,
        req,
        res
      );
    });

    app.delete("/deleteProduit/:idProduit", function (req, res) {
      todo.deleteProduit(req.params.idProduit, req, res);
    });

    /////////////////////////////////////////////////User/////////////////////////////////////////////:
    app.get("/selectUsers", function (req, res) {
      todo.selectUsers(req, res);
    });

    app.put("/updateUser", function (req, res) {
      todo.updateUser(req.body.nom, req.body.type, req.body.idUser, req, res);
    });

    app.delete("/deleteUser/:idUser", function (req, res) {
      todo.deleteUser(req.params.idUser, req, res);
    });

    app.post("/login", function (req, res) {
      todo.reqlogin(
        req.body.email,
        req.body.password,
        req.body.token,
        req,
        res
      );
    });
  },
};
