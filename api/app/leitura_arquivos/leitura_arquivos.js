const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');

const util = require('../util/util');

const regexUflaCard = /([0-9]){1}([0-9]){10}([0-9]){8}([0-9]){8}([0-9]){8}([0-9]){7}([A-Z]){8}/gi;
const regexFagammonCard = /([0-9]){1}([0-9]){8}([0-9]){8}([A-Z]){12}([0-9]){7}/gi;



exports.lerArquivos = function lerArquivos(){

    try{

        db = new sqlite3.Database('./db/master-database.db');

        fs.readdir('./files/', function (err, files) {
            
            if (err) {
                util.gerarLogAplicacao("Erro ao ler os arquivos da pasta files. Data: "+ new Date() + ". -- ");
                return;
            }
            
            files.forEach(function (file) {
            
                if(util.verificarArquivosSalvos(file)){
                    if(file.split(".")[1] == "txt"){
                        fs.readFile('./files/'+file, 'utf8', function (err,data) {
                            if (err) {
                                util.gerarLogAplicacao("Erro na leitura do arquivo. Arquivo: "+file +" Data: "+ new Date() + ". -- ");
                                return;
                            }
                            let retorno = data.split(" -- ");
                            
                            salvarTransacoes(retorno,file);
    
                        });
                    }
                    else if(file.split(".")[1] == "csv"){
                        let transacoes = [];
                        fs.createReadStream('./files/'+file)
                            .pipe(csv({
                                mapValues: ({ header, index, value }) => transacoes.push(...value.split(';'))
                            }))
                            .on('data', (dados) => console.log(dados))
                            .on('end', () => {
    
                            salvarTransacoes(transacoes,file);
    
                        });
                    }
                }
                else{
                    util.gerarLogAplicacao("Arquivo com o mesmo nome já foi lido. Arquivo: "+file +" Data: "+ new Date() + ". -- ");
                }

                
                
            });
        });
    }
    catch {
        util.gerarLogAplicacao("Erro na função de leitura de arquivos. Data: "+ new Date() + ". -- ");
    }
}

function salvarTransacoes(vetorTransacoes,nomeArquivo){
    
    try{
        db = new sqlite3.Database('./db/master-database.db');

        vetorTransacoes.map((documento) => {
                            
            if(documento.match(regexUflaCard)) {
                
                db.run(`

                    INSERT INTO transacoes
                    (
                        tipo_registro,
                        estabelecimento,
                        data_processamento,
                        periodo_inicial,
                        periodo_final,
                        sequencia,
                        adquirente,
                        arquivo
                    )
                    VALUES(
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )`,[
                        documento[0],
                        documento.substring(1, 11),
                        util.formatarData(documento.substring(11,19)),
                        util.formatarData(documento.substring(19,27)),
                        util.formatarData(documento.substring(27,35)),
                        documento.substring(35,42),
                        documento.substring(42,50),
                        nomeArquivo
                ]);

            }
            else if(documento.match(regexFagammonCard)) {
                
                
                db.run(`
                    INSERT INTO transacoes
                    (
                        tipo_registro,
                        data_processamento,
                        estabelecimento,
                        adquirente,
                        sequencia,
                        arquivo
                        
                    )
                    VALUES(
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )`,[
                        documento[0],
                        util.formatarData(documento.substring(1, 9)),
                        documento.substring(9,17),
                        documento.substring(17,29),
                        documento.substring(29,36),
                        nomeArquivo
                    ]
                );                                
            }
        })

        util.salvarArquivoNoBackup('./files/'+nomeArquivo,'./backup/'+nomeArquivo);

        util.gerarLogLeituraArquivos(nomeArquivo);

        util.deletarArquivosRecepcionados('./files/'+nomeArquivo);
        
        db.close((err) => {
            if (err) {
                util.gerarLogAplicacao("Erro ao fechar conexão com o banco. Data: "+ new Date() + ". -- ");
                return;
            }
        });

    }
    catch(e){
        util.gerarLogAplicacao("Erro na função de salvar as transações. Data: "+ new Date() + ". -- ");
    }

}