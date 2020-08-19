const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const util = require('./util/util');


exports.iniciarServidor = function (){

    app.use(bodyParser.json());

    app.use(cors());

    app.listen(3500, () =>
    console.log(`Servidor rodando na porta 3500!`),
    );

    app.get('/transacoes', function(req, res) {

        let sql = `SELECT * FROM transacoes
            ORDER BY id`;

        try{
            db = new sqlite3.Database('./db/master-database.db');
            let arrayLinhas = []
            db.all(sql, [], (err, rows) => {
                if (err) {
                    util.gerarLogAplicacao("Erro ao selecionar os registros. Data: "+ new Date() + ". -- ")
                    throw err;
                }
                rows.forEach((row) => {
                    arrayLinhas.push(row)
                });
                
                res.status = 200;
                res.send(arrayLinhas);
            });

            db.close((err) => {
                if (err) {
                    util.gerarLogAplicacao("Erro ao fechar conexão com o banco. Data: "+ new Date() + ". -- ")
                }
            });
        }
        catch(e){
            util.gerarLogAplicacao("Erro na consulta de registros. Data: "+ new Date() + ". -- ")
            res.status = 500;
            res.send("Erro 500.");
        }
        
    });

    app.get('/arquivos',function(req, res) {
        try{
            
            let arquivosNaoRecepcionados = [];
            let arquivosRecepcionados = [];
            let arquivos = [];
            arquivosNaoRecepcionados = fs.readdirSync('./files/'); 
            arquivosRecepcionados = fs.readdirSync('./backup/');

            arquivosNaoRecepcionados.map((arquivo)=>{
                arquivos.push({
                    nome: arquivo,
                    recepcionado: "Não"
                })
            })

            arquivosRecepcionados.map((arquivo)=>{
                arquivos.push({
                    nome: arquivo,
                    recepcionado: "Sim"
                })
            })

            res.status = 200;
            res.send(arquivos)
        }
        catch(e){
            util.gerarLogAplicacao("Erro na consulta de arquivos. Data: "+ new Date() + ". -- ")
            res.status = 500;
            res.send("Erro 500.");
        }
        
    });

    app.get('/arquivos/estatistica',function(req, res) {
        try{
            
            let arquivosNaoRecepcionados = [];
            let arquivosRecepcionados = [];
            arquivosNaoRecepcionados = fs.readdirSync('./files/'); 
            arquivosRecepcionados = fs.readdirSync('./backup/');

            res.status = 200;
            res.send({
                qtdArquivosRecepcionados: arquivosRecepcionados.length,
                qtdArquivosNaoRecepcionados: arquivosNaoRecepcionados.length
            })
        }
        catch(e){
            util.gerarLogAplicacao("Erro na rota de estatisticas de arquivos. Data: "+ new Date() + ". -- ");
            res.status = 500;
            res.send("Erro 500.");
        }
        
    });
}