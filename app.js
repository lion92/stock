var express = require('express');
var bodyParser = require('body-parser');
var envoi = require('./app/model/stcock');
const cors=require('cors');
var connection = require('./app/config/connection');
var routes = require('./app/controlleur/route');
const todo = require('./app/model/stcock');
const cookieParser=require("cookie-parser");
var app = express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/cookie', function(req, resp) {
    console.log(req.cookies['bataillenavale']);
    resp.send({ status: 0, message: "ok" + req.cookies['bataillenavale'] });
})
app.use(cors())
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/img', express.static(__dirname + 'public/son'))
app.use(express.static('views'))
app.set('view engine', 'html');

app.get('', (req, res) => {
    res.render( "index")
})
app.get('/info', (req, res) => {
    res.render('chat')
})

app.get('/about', (req, res) => {
    res.render('about', { text: 'About Page'})
})
app.get('/partie', (req, res) => {
    res.render('partie')
})
app.get('/bateau', (req, res) => {
    res.render('bateau')
})
app.get('/connexion', (req, res) => {
    res.render('connexion')
})

app.get('/loginpage', (req, res) => {
    res.render('login')
})

app.post('/upload', async (req, res) => {
    try {
        console.log(req);

        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = [];

            //loop all files
            _.forEach(_.keysIn(req.files.photos), (key) => {
                let photo = req.files.photos[key];

                //move photo to uploads directory
                photo.mv('./public/img' + photo.name);

                //push file details
                data.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });
            });

            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);

    }
});

connection.init();
routes.configure(app);
//app.listen();

io.on('connection', function(socket){
    console.log("//////////////////CONNNECTE////");
    socket.on('disconnect', function(){
        console.log('TTTTTTTTTTTT disco');
    })
    let transfert="";
    socket.on("chat message", function(msg){
        console.log(msg)
        if(!(msg.split(":")[0]===undefined||msg.split(":")[1]===undefined)){
            let user=msg.split(":")[0];
            let message=msg.split(":")[1];

            todo.enregistrerMsg(user,message);
        }
        io.emit("chat message", msg)

    })

    socket.on("information", function(msg){
        console.log(msg)

        todo.chatkriss(msg);
        io.emit("chat message", msg)

    })



    socket.on('actuTir', function(msg){
        console.log("QUIIII:: "+msg);
        io.emit('tir', msg);
        console.log("QUIIII2:: "+msg);
    })

    socket.on('untir', function(msg){
        console.log("tir:: "+msg);
        io.emit('untir', msg);
        console.log("QUIIII2:: "+msg);
    })
})
//pass a http.Server instance
http.listen(8000);
/*var server = app.listen(8000, function(){



  console.log('Server listening on port ' + server.address().port);
});*/
