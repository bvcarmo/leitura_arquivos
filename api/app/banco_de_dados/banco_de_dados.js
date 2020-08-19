const sqlite3 = require('sqlite3').verbose();
const util = require('../util/util');


exports.iniciaBanco = function(){

    let db = new sqlite3.Database('./db/master-database.db');

    db.run(
        `
        CREATE TABLE IF NOT EXISTS transacoes ( 
            id iNTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_registro INTEGER NOT NULL,
            estabelecimento BIGINT NOT NULL,
            data_processamento  DATETIME NOT NULL,
            periodo_inicial DATETIME NULL,
            periodo_final DATETIME NULL,
            sequencia TEXT NOT NULL,
            adquirente CHARACTER(20) NOT NULL,
            arquivo TEXT NOT NULL
        );
    
        `
    );

    db.close((err) => {
        if (err) {
            util.gerarLogAplicacao("Erro ao iniciar o banco de dados. Data: "+ new Date() + ". -- ");
        }
    });

}
