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

    app.get("/selectPersonneParid/:id", function (req, res) {
      todo.selectPersonnes(req.params.id,req, res);
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
    app.post("/ajoutCategorie", function (req, res) {
      todo.reqgisterCategorie(
        req.body.nom,
        req.body.type,
        
        req,
        res
      );
    });

    app.get("/selectCategorie/:email", function (req, res) {
      todo.selectCategorie(req.params.email, req, res);
    });

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
    app.post("/ajoutProduit", function (req, res) {
      todo.reqgisterProduit(
        req.body.idCategorie,
        req.body.prix,
        req.body.stock,
        req.body.nom,
        
        req,
        res
      );
    });
    app.get("/selectProduit/:email", function (req, res) {
      todo.selectProduit(req.params.email, req, res);
    });

    app.get("/selectProduits", function (req, res) {
      todo.selectProduits(req, res);
    });
    app.get("/selectProduitParId/:idProduit", function (req, res) {
      todo.selectProduitParId(req.params.idProduit,req, res);
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

    /////////////////////////////////////////////////User/////////////////////////////////////////////
    app.post("/ajoutUser", function (req, res) {
        todo.reqgisterUser(
            req.body.mdp,
            req.body.idPersonne,
           
          req,
          res
        );
      });

      app.get("/selectUser/:email", function (req, res) {
        todo.selectUser(req.params.email, req, res);
      });

    app.get("/selectUsers", function (req, res) {
      todo.selectUsers(req, res);
    });

    app.put("/updateUser", function (req, res) {
      todo.updateUser(
        req.body.mdp,
        req.body.idPersonne,
        req.body.idUser,
        req,
        res
      );
    });

    app.delete("/deleteUser/:idUser", function (req, res) {
      todo.deleteUser(req.params.idUser, req, res);
    });
    /////////////////////////////////////////////////////vente////////////////////////////////////////////

    app.post("/ajoutVente", function (req, res) {
      todo.reqgisterVente(
        req.body.idClient,
        req.body.idProduit,
        req.body.quantite,
        req.body.prixTotal,
        req.body.idUser,
        req.body.taxe,
        req,
        res
      );
    });
    app.get("/selectVente/:email", function (req, res) {
      todo.selectVente(req.params.email, req, res);
    });
    app.get("/selectVentes", function (req, res) {
      todo.selectVentes(req, res);
    });

    app.put("/updateVente", function (req, res) {
      todo.updateVente(
        req.body.idClient,
        req.body.idProduit,
        req.body.quantite,
        req.body.prixTotal,
        req.body.idUser,
        req.body.taxe,
        req.body.idVente,
        req,
        res
      );
    });

    app.delete("/deleteVente/:idVente", function (req, res) {
      todo.deleteVente(req.params.idVente, req, res);
    });
    //////////////////////////////////////////////////client//////////////////////////////////////////////////
    app.post("/ajoutClient", function (req, res) {
        todo.reqgisterClient(
            req.body.idPersonne,
            req.body.societe,req.body.poste
           ,
          req,
          res
        );
      });

      app.get("/selectClient/:email", function (req, res) {
        todo.selectClient(req.params.email, req, res);
      });

    app.get("/selectClients", function (req, res) {
      todo.selectClients(req, res);
    });

    app.put("/updateClient", function (req, res) {
      todo.updateClient(
        req.body.mdp,
        req.body.idPersonne,
        req.body.idClient,
        req,
        res
      );
    });

    app.delete("/deleteClient/:idClient", function (req, res) {
      todo.deleteClient(req.params.idClient, req, res);
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
