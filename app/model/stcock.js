var connection = require("../config/connection");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
var express = require("express");
const { response } = require("express");

var app = express();
var messagebis = "diidoi";
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
let transport = nodemailer.createTransport({
  host: "mail.krissdeveloppeur.com",
  secure: false,
  auth: {
    user: "envoi@krissdeveloppeur.com",
    pass: "envoienvoi!",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function stock() {
  this.reqdeconnexion = function (req, res) {
    res.clearCookie("essai");
    res.send({ status: 200, message: "deconnexion" });
  };

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
          "select password2 from user where email=?",
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
              res.send({ status: 1, message: "email" });
            } else {
              // res.send({ status: 0, message:  result[0].password2});
              //console.log("Post successful");
              if (!result[0]) {
                res.send({ status: 1, message: "email invalid" });
              } else {
                bcrypt.compare(
                  reqpassword,
                  result[0].password2,
                  function (err, result2) {
                    // result == true
                    if (err) {
                      res.send({
                        status: 500,
                        message:
                          "Erreur pour comparer les mots de passe " + reqemail,
                      });
                      con.release();
                    }
                    if (!result2) {
                      res.send({
                        status: 500,
                        message: "Mot de passe incorrect pour " + reqemail,
                      });
                    } else {
                      const jwttoken = jwt.sign(
                        { email: reqemail },
                        "secret_this_should_be_longer",
                        { expiresIn: "1h" }
                      );
                      const cookieOption = {
                        expiresIn: new Date(Date.now() + 24 * 3600),
                        httpOnly: true,
                      };
                      console.log(jwttoken);
                      res.cookie("essai", jwttoken, cookieOption);
                      res.send({
                        status: 200,
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
      res.send({ status: 1, message: "Connecté " + email });
    }
  };
  this.reqgisterPersonne = function (
    reqnom,
    reqprenom,
    reqage,
    reqville,
    reqNumero,
    reqAdresse,
    reqCodePostale,
    reqEmail,
    req,
    res
  ) {
    let hashpass = "";
    let bon = "";
    connection.acquire(function (err, con) {
      //console.log(err);
      //console.log("Connecté à la base de données MySQL!");

      //console.log(req.cookies);

      //console.log(hash);
      // Store hash in your password DB.

      con.query(
        "insert into personne (nom, prenom, age, ville, numeroTelephone, adresse, codePostale, email,ajoutDate) values (?,?,?,?,?,?,?,?,?)",
        [
          reqnom,
          reqprenom,
          reqage,
          reqville,
          reqNumero,
          reqAdresse,
          reqCodePostale,
          reqEmail,
          dateHeureActuelle()
        ],
        function (err, result) {
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
            //console.log("KKKKKKKKKKKKKKKKKK");
            res.send({
              status: 1,
              message: "Erreur de conection ou login existe" + err,
            });
            con.release();
          } else {
            //console.log("IIIIIIIIIIIIIIIIIIIIIII");
            res.send({
              status: 200,
              message:
                "Utilisateur enregistre ," +
                reqEmail +
                "," +
                reqnom +
                "," +
                reqprenom +
                "," +
                reqage +
                "," +
                reqNumero +
                "," +
                "," +
                reqAdresse +
                "," +
                reqCodePostale +
                "," +
                reqville,
            });
            //console.log("Post successful");
            con.release();
          }
        }
      );
    });
  };

  this.selectPersonnes = function (req, res) {
    let hashpass = "";
    let bon = "";
    connection.acquire(function (err, con) {
      //console.log(err);
      //console.log("Connecté à la base de données MySQL!");

      //console.log(req.cookies);

      //console.log(hash);
      // Store hash in your password DB.

      con.query(
        "select * from personne",
        function (err, result) {
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
            //console.log("KKKKKKKKKKKKKKKKKK");
            res.send({
              status: 1,
              message: "Erreur de conection ou login existe" + err,
            });
            con.release();
          } else {
            //console.log("IIIIIIIIIIIIIIIIIIIIIII");
            res.send({
              status: 200,
              message: result,
            });
            //console.log("Post successful");
            con.release();
          }
        }
      );
    });
  };

  this.updatePersonne = function (
    reqnom,
    reqprenom,
    reqage,
    reqville,
    reqNumero,
    reqAdresse,
    reqCodePostale,
    reqEmail,
    reqIdPersonne,
    req,
    res
  ) {
    connection.acquire(function (err, con) {
      //console.log(err);
      //console.log("Connecté à la base de données MySQL!");

      //console.log(req.cookies);

      //console.log(hash);
      // Store hash in your password DB.

      con.query(
        "UPDATE `personne` SET `nom`=?,`prenom`=?,`age`=?,`ville`=?,`numeroTelephone`=?,`adresse`=?,`codePostale`=?,`email`=?,`ajoutDate`=?   WHERE idPersonne=?",
        [
          reqnom,
          reqprenom,
          reqage,
          reqville,
          reqNumero,
          reqAdresse,
          reqCodePostale,
          reqEmail,
          dateHeureActuelle(),
          reqIdPersonne,
        ],
        function (err, result) {
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
            //console.log("KKKKKKKKKKKKKKKKKK");
            res.send({
              status: 500,
              message: "Erreur de conection ou login existe" + err,
            });
            con.release();
          } else {
            //console.log("IIIIIIIIIIIIIIIIIIIIIII");
            res.send({
              status: 200,
              message: result,
            });
            //console.log("Post successful");
            con.release();
          }
        }
      );
    });
  };
  this.deletePeronne = function (reqIdPersonne, req, res) {
    connection.acquire(function (err, con) {
      con.query(
        "DELETE FROM `personne` WHERE idPersonne=?",
        reqIdPersonne,
        function (err, result) {
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
            res.send({
              status: 500,
              message: "Erreur de conection ou login existe" + err,
            });
            con.release();
          } else {
            res.send({
              status: 200,
              message: result,
            });
            con.release();
          }
        }
      );
    });
  };
  this.reqgisterCategorie = function (
    reqnom,
    reqtype,
    req,
    res
  ) {
   
    connection.acquire(function (err, con) {
      //console.log(err);
      //console.log("Connecté à la base de données MySQL!");

      //console.log(req.cookies);

      //console.log(hash);
      // Store hash in your password DB.

      con.query(
        "INSERT INTO `categorie`(`nom`, `type`,`dateAjout`) values (?,?,?)",
        [
          reqnom,
          reqtype,
		  dateHeureActuelle()
          
        ],
        function (err, result) {
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
            //console.log("KKKKKKKKKKKKKKKKKK");
            res.send({
              status: 500,
              message: "Erreur de conection ou login existe" + err,
            });
            con.release();
          } else {
            //console.log("IIIIIIIIIIIIIIIIIIIIIII");
            res.send({
              status: 200,
              message:result
            });
            //console.log("Post successful");
            con.release();
          }
        }
      );
    });
  };
  this.reqgisterClient = function (
    reqIdPersonne,
    reqsociete,
    reqposte,
    req,
    res
  ) {
   
    connection.acquire(function (err, con) {
      //console.log(err);
      //console.log("Connecté à la base de données MySQL!");

      //console.log(req.cookies);

      //console.log(hash);
      // Store hash in your password DB.

      con.query(
        "INSERT INTO `client`(`idPersonneClient`, `societe`, `poste`, `dateAjout`)  values (?,?,?,?)",
        [
            reqIdPersonne,
            reqsociete,
            reqposte,
            dateHeureActuelle()
          
        ],
        function (err, result) {
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
            //console.log("KKKKKKKKKKKKKKKKKK");
            res.send({
              status: 500,
              message: "Erreur de conection ou login existe" + err,
            });
            con.release();
          } else {
            //console.log("IIIIIIIIIIIIIIIIIIIIIII");
            res.send({
              status: 200,
              message:result
            });
            //console.log("Post successful");
            con.release();
          }
        }
      );
    });
  };

  this.reqgisterProduit = function (
    reqIdCategorie,
    reqPrix,
    reqstock,
    reqNom,
    req,
    res
  ) {
   
    connection.acquire(function (err, con) {
      //console.log(err);
      //console.log("Connecté à la base de données MySQL!");

      //console.log(req.cookies);

      //console.log(hash);
      // Store hash in your password DB.

      con.query(
        "INSERT INTO `produit`(`idCategorie`, `Prix`, `stock`, `nom`, `dateProduit`) values (?,?,?,?,?)",
        [
            reqIdCategorie,
            reqPrix,
            reqstock,
            reqNom,
            dateHeureActuelle()
        ],
        function (err, result) {
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
            //console.log("KKKKKKKKKKKKKKKKKK");
            res.send({
              status: 500,
              message: "Erreur de conection ou login existe" + err,
            });
            con.release();
          } else {
            //console.log("IIIIIIIIIIIIIIIIIIIIIII");
            res.send({
              status: 200,
              message:result
            });
            //console.log("Post successful");
            con.release();
          }
        }
      );
    });
  };

  this.reqgisterUser = function (
    reqIdPersonne,
    reqMDP,
    req,
    res
  ) {
   
    connection.acquire(function (err, con) {
      //console.log(err);
      //console.log("Connecté à la base de données MySQL!");

      //console.log(req.cookies);

      //console.log(hash);
      // Store hash in your password DB.

      con.query(
        "INSERT INTO `user`(`idPersonneUser`, `motDePasse`, `ajoutDate`) values (?,?,?)",
        [
            reqIdPersonne,
            reqMDP,
            dateHeureActuelle()
        ],
        function (err, result) {
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
            //console.log("KKKKKKKKKKKKKKKKKK");
            res.send({
              status: 500,
              message: "Erreur de conection ou login existe" + err,
            });
            con.release();
          } else {
            //console.log("IIIIIIIIIIIIIIIIIIIIIII");
            res.send({
              status: 200,
              message:result
            });
            //console.log("Post successful");
            con.release();
          }
        }
      );
    });
  };

  this.reqgisterVente = function (
    reqIdClient,
    reqIdProduit,
    requantite,
    reqPrixTotal,
    reqIdUSer,
    reqTaxe,
    req,
    res
  ) {
   
    connection.acquire(function (err, con) {
      //console.log(err);
      //console.log("Connecté à la base de données MySQL!");

      //console.log(req.cookies);

      //console.log(hash);
      // Store hash in your password DB.

      con.query(
        "INSERT INTO `vente`(`idClient`, `idProduit`, `quantite`, `PrixTotal`, `idUser`, `taxe`, `dateVente`) values (?,?,?,?,?,?,?)",
        [
            reqIdClient,
            reqIdProduit,
            requantite,
            reqPrixTotal,
            reqIdUSer,
            reqTaxe,
            dateHeureActuelle()
        ],
        function (err, result) {
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
            //console.log("KKKKKKKKKKKKKKKKKK");
            res.send({
              status: 500,
              message: "Erreur de conection ou login existe" + err,
            });
            con.release();
          } else {
            //console.log("IIIIIIIIIIIIIIIIIIIIIII");
            res.send({
              status: 200,
              message:result
            });
            //console.log("Post successful");
            con.release();
          }
        }
      );
    });
  };




  function dateHeureActuelle(){
    const start = Date.now();
    const date = new Date(start);
    //const formatted = date.toLocaleDateString("fr-FR")
    return date;
  }
}


module.exports = new stock();
