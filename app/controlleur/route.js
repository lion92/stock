var todo = require("../model/stcock");
let fileupload = require("express-fileupload");
module.exports = {
  

  configure: function (app) {
    ////////////////////login/////////////////
    app.post('/login', function(req, res){
      todo.reqlogin(req.body.email, req.body.password, req.body.token, req, res);
    });
    ////////////////////////////
    //////////////////////////////Personne//////////////////////////////////////////////////
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
    app.get("/selectPersonneParEmail/:email", function (req, res) {
      todo.selectPersonneParEmail(req.params.email, req, res);
    });
    app.get("/selectCollections", function (req, res) {
      todo.selectCollections(req, res);
    });

    app.get("/selectCollectionParId/:id", function (req, res) {
      todo.selectCollectionsParId(req.params.id, req, res);
    });

    app.put("/updateCollection", function (req, res) {
      todo.updateCollection(
          req.body.nom,
          req.body.idProduitCollection,
          req.body.idUSer,req.body.idCollection,

          req,
          res
      );
    });

    app.post("/ajoutCollection", function (req, res) {
      todo.reqgisterCollection(
          req.body.nom,
          req.body.idUSer,

          req,
          res
      );
    });


    app.delete("/deleteColletcion/:idColletcion", function (req, res) {
      todo.deleteCollection(req.params.idColletcion, req, res);
    });



    app.get("/selectCollectionInserts", function (req, res) {
      todo.selectCollectionInserts(req, res);
    });

    app.get("/selectCollectionInsertParId/:id", function (req, res) {
      todo.selectCollectionInsertsParId(req.params.id, req, res);
    });

    app.put("/updateCollectionInsert", function (req, res) {
      todo.updateCollectionInsert(
          req.body.idContenu,
          req.body.idCollection,
          req.body.idProduit,
          req,
          res
      );
    });

    app.post("/ajoutCollectionInsert", function (req, res) {
      todo.reqgisterCollectionInsert(
          req.body.idProduit,
          req.body.idCollection,
          req,
          res
      );
    });


    app.delete("/deleteCollectionInsert/:idColletcion", function (req, res) {
      todo.deleteCollectionInsert(req.params.idColletcion, req, res);
    });

    app.get("/selectPersonnes", function (req, res) {
      todo.selectPersonnes(req, res);
    });

    app.get("/selectPersonneParid/:id", function (req, res) {
      todo.selectPersonneParId(req.params.id, req, res);
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

    app.put("/updatePersonneImage", function (req, res) {
      todo.updatePersonneImage(
          req.body.image,
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

    app.get("/selectCategorieParId/:id", function (req, res) {
      todo.selectCategorieParId(req.params.id, req, res);
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
    ////////////////////////////////////////////////Contenu////////////////////////////////////////
    app.post("/ajoutContenu", function (req, res) {
      todo.reqgisterContenu(
          req.body.idContenuCollection,
          req.body.produit,

          req,
          res
      );
    });

    app.get("/selectContenu/:email", function (req, res) {
      todo.selectContenu(req.params.email, req, res);
    });

    app.get("/selectContenus", function (req, res) {
      todo.selectContenus(req, res);
    });

    app.get("/selectContenuParId/:id", function (req, res) {
      todo.selectContenuParId(req.params.id, req, res);
    });

    app.put("/updateContenu", function (req, res) {
      todo.updateContenu(
          req.body.id,
           req.body.produit,
          req.body.idContenuCollection,
          req,
          res
      );
    });

    app.delete("/deleteContenu/:idContenu", function (req, res) {
      todo.deleteContenu(req.params.idContenu, req, res);
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
      todo.selectProduitParId(req.params.idProduit, req, res);
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

    this.reqlogin = function (reqemail, reqpassword, reqtoken, req, res) {
      let conection2 = false;
      let email = "";
      jwt.verify(
          reqtoken,
          "secret_this_should_be_longer",
          function (err, decoded) {
            //console.log("////////////");
            if (decoded === undefined) {
              conection2 = true;
            } else {
              email = decoded.email;
              conection2 = false;
            }
            ////console.log(decoded.code) // bar
          }
      );
      if (conection2 == true) {
        connection.acquire(function (err, con) {
          //console.log(err);
          //console.log("Connecté à la base de données MySQL!");

          con.query(
              "select motDePasse from user inner join personne on user.idPersonneUser=personne.idPersonne where email=?",
              reqemail,
              function (err, result) {
                con.release();

                res.header("Access-Control-Allow-Origin", "*");
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,OPTIONS,POST,PUT"
                );
                res.header(
                    "Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
                );
                if (err) {
                  res.send({status: 1, message: "email"});
                } else {
                  // res.send({ status: 0, message:  result[0].password2});
                  //console.log("Post successful");
                  if (!result[0]) {
                    res.send({status: 1, message: "email invalid"});
                  } else {
                    bcrypt.compare(
                        reqpassword,
                        result[0].password2,
                        function (err, result2) {
                          // result == true
                          if (err) {
                            res.send({
                              status: 0,
                              message:
                                  "Erreur pour comparer les mots de passe " + reqemail,
                            });
                            con.release();
                          }
                          if (!result2) {
                            res.send({
                              status: 0,
                              message: "Mot de passe incorrect pour " + reqemail,
                            });
                          } else {
                            const jwttoken = jwt.sign(
                                {email: reqemail},
                                "secret_this_should_be_longer",
                                {expiresIn: "12h"}
                            );
                            const cookieOption = {
                              expiresIn: new Date(Date.now() + 12*24 * 3600),
                              httpOnly: true,
                            };
                            console.log(jwttoken);

                            res.send({
                              status: 0,
                              message: "Connecte " + reqemail + result2,
                              token: jwttoken,
                            });
                          }
                        }
                    );
                  }
                }
              }
          );
        });
      } else {
        // res.clearCookie("essai");
        res.send({status: 1, message: "Connecté " + email});
      }
    };

    app.get("/selectUser/:email", function (req, res) {
      todo.selectUserparEmail(req.params.email, req, res);
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
          req.body.PrixTotal,
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
     
    app.get("/ventesTotal/:idProduit", function (req, res) {
      todo.venteTotalParIdProduit(req.params.idProduit,req,res);
    });



    app.get("/selectVenteParId/:id", function (req, res) {
      todo.selectVenteParId(req.params.id, req, res);
    });

    app.put("/updateVente", function (req, res) {
      todo.updateVente(
          req.body.idClient,
          req.body.idProduit,
          req.body.quantite,
          req.body.PrixTotal,
          req.body.idUser,
          req.body.taxe,
          req.body.idvente,
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
          req.body.idPersonneClient,
          req.body.societe, req.body.poste
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

    app.get("/selectClientParId/:id", function (req, res) {
      todo.selectClientParId(req.params.id, req, res);
    });

    app.put("/updateClient", function (req, res) {
      todo.updateClient(
          req.body.idPersonneClient,
          req.body.idClient,
          req.body.societe,
          req.body.poste,
          req,
          res
      );
    });

    app.delete("/deleteClient/:idClient", function (req, res) {
      todo.deleteClient(req.params.idClient, req, res);
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    app.post("/AjoutPhoto", fileupload(), function (req, res) {
      todo.uploadPicture(
          req,
          res
      );
    })
  }
};
