var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
var fs = require('fs');
var formidable = require('formidable');

var app = express();

//const api='b15f3177256d90c6c3fa4bbc5442238c';
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/AssBetaTeamDB");
const port =3004;


app.get('/',(req,res) =>{
    fs.readdir('C:/nodeclss/node-text/public/savedtext/', function(err, items) {
        res.render('index',{fileContent: items, fileGot: null}) 
    }); 
})
//https://mdbootstrap.com/plugins/jquery/chat/
app.post('/saveFile',(req,res)=>{
   let fileName = req.body.fileName;
   let fileContent = req.body.fileContent;
    fs.appendFile(`C:/nodeclss/node-text/public/savedtext/${fileName}.html`, fileContent, function (err) {
        if (err) throw err;
        fs.readFile(`C:/nodeclss/node-text/public/savedtext/${fileName}.html`,'utf8',function(err, data) {
            console.log(data)
                let fileGot = data;
            fs.readdir('C:/nodeclss/node-text/public/savedtext/', function(err, items) {
                res.render('index',{fileContent: items, fileGot: fileGot}) 
            }); 
            }); 
      });
})

app.get('/getFile/:fileN',(req,res)=>{
    fs.readFile(`C:/nodeclss/node-text/public/savedtext/${req.params.fileN}`,'utf8',function(err, data) {
    console.log(data)
        let fileGot = data;
    fs.readdir('C:/nodeclss/node-text/public/savedtext/', function(err, items) {
        res.render('index',{fileContent: items, fileGot: fileGot}) 
    }); 
    });
})






 



app.listen(port,() => {
  console.log("Server started and listening at "+port);
});