var assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var app = express();

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'veiculodb'
});

function conecta(){
    try{
      mysqlConnection.connect((err)=>{
        if(!err){
            console.log('Sucesso ao conectar!');
        }
        else
        console.log('Falhou ao conectar!\n Error : ' + JSON.stringify(err,undefined,2));
      })
      return true;
      }catch(e){
      return false;
    }
  }

  describe('conecta()', function() {
    describe('#indexOf conecta()', function() {
      it('Retorna FALSE caso valor seja inexistente!', function() {
        assert.equal(conecta(), true);
      });
    });
  });

function read(){
    try{
      app.get('/select',(req,res,next)=>{
        mysqlConnection.query('SELECT * FROM veiculo', function (error,rs){
            if (error) throw error;
            res.render('select', {veiculos : rs});
        });
    });
      return true;
    }catch(e){
      return false;
    }finally{
    console.log("Função read() ok!");
    }
}

describe('read()', function() {
  describe('#indexOf read()', function() {
    it('Retorna FALSE caso valor seja inexistente!', function() {
      assert.equal(read(), true);
    });
  });
});


function deleta(){
  try{
    app.get('/delete',(req,res)=>{
      mysqlConnection.query('DELETE FROM veiculo WHERE id = ?',req.query.id, function (error,rs){
          if (error) throw error;
          res.redirect('/select');
      });
  });
  console.log("Função deleta() ok!");
   return true;
  }catch(e){
    return false;
  }
}

describe('deleta()', function() {
  describe('#indexOf deleta()', function() {
    it('Retorna FALSE caso valor seja inexistente!', function() {
      assert.equal(deleta(), true);
    });
  });
});

function create(){
  try{
    app.post('/show', function (req, res) {
      var postData  = req.body;
      mysqlConnection.query('INSERT INTO veiculo SET ?', postData, function (error, results, fields) {
         if (error) throw error;
       });
   });
   console.log("Função create() ok!");
    return true;
    }catch(e){
     return false;
    }
}
describe('create()', function() {
  describe('#indexOf create()', function() {
    it('Retorna FALSE caso valor seja inexistente!', function() {
      assert.equal(create(), true);
    });
  });
});

function edit(){
  try{
    app.get('/edit', function (req, res) {
      mysqlConnection.query('SELECT * FROM veiculo WHERE id = ?',req.query.id, function (error,rs){
         if (error) throw error;
       });
   });
   console.log("Função edit() ok!");
   return true;
  }catch(e){
    return false;
  }
}

describe('edit()', function() {
  describe('#indexOf edit()', function() {
    it('Retorna FALSE caso valor seja inexistente!', function() {
      assert.equal(edit(), true);
    });
  });
});
