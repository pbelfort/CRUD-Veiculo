
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'veiculodb'
});

var app = express()

function conecta(){
    mysqlConnection.connect((err)=>{
        if(!err){
            console.log('Sucesso ao conectar!');
        }
        else
        console.log('Falhou ao conectar!\n Error : ' + JSON.stringify(err,undefined,2));
    })
}

conecta();

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000,function(){
    console.log("Server is running...")
});

app.set('view engine','ejs');

app.get('/index',(req,res)=>{
    res.render('./index.ejs',{veiculos : {}});
});

//Read
app.get('/select',(req,res,next)=>{
    mysqlConnection.query('SELECT * FROM veiculo', function (error,rs){
        if (error) throw error;
        res.render('select', {veiculos : rs});
    });
});

//Delete
app.get('/delete',(req,res)=>{
    mysqlConnection.query('DELETE FROM veiculo WHERE id = ?',req.query.id, function (error,rs){
        if (error) throw error;
        res.redirect('/select');
    });
});

//Create
app.post('/show', function (req, res) {
    var postData  = req.body;
    mysqlConnection.query('INSERT INTO veiculo SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.redirect('/index');
     });
 });

 //Edit
app.get('/edit', function (req, res) {
    mysqlConnection.query('SELECT * FROM veiculo WHERE id = ?',req.query.id, function (error,rs){
       if (error) throw error;
       res.render('index',{veiculos : rs[0]});
     });
 });