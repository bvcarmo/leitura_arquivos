const fs = require('fs');

const gerarLogLeituraArquivos = function (nomeArquivo){
    fs.appendFile('./assets/log/log_leitura_arquivo.txt', nomeArquivo + ' - Recepcionado em: '+ new Date() + '; ', 
        function (err) {
            if (err) gerarLogAplicacao("Erro ao inserir log de arquivos. Nome do arquivo: "+ nomeArquivo + ". Data: "+ new Date() + ". -- ");
        });
}

const gerarLogAplicacao = function (log){
    fs.appendFile('./assets/log/log_aplicacao.txt', log, 
        function (err) {
            return;
        });
}

const formatarData = function (data){
    return(data.substring(0,4)+'-'+data.substring(4,6)+'-'+data.substring(6,8))
}

//Função que salva o arquivo lido na pasta backup
const salvarArquivoNoBackup = function (arquivo, destino){
    fs.copyFile(arquivo, destino, (err) => { 
        if (err) { 
            gerarLogAplicacao("Erro ao salvar o backup do arquivo. Nome do arquivo: "+ arquivo + ". Data: "+ new Date() + ". -- ")
        } 
        else { 
            gerarLogAplicacao("Backup do arquivo gerado com sucesso. Nome do arquivo: "+ arquivo + ". Data: "+ new Date() + ". -- ")
        }
    });
}

//Função para deletar os arquivos que já foram recepcionados
const deletarArquivosRecepcionados = function (caminho){
    
    fs.unlink(caminho,(err) => {
        if (err) {
            gerarLogAplicacao("Erro ao deletar arquivo. Nome do arquivo: "+ caminho + ". Data: "+ new Date() + ". -- ")
        }
    });
}

// Função para verificar se arquivo já foi salvo
const verificarArquivosSalvos = function (nomeArquivo){
    
    let arquivosRecepcionados = [];
    arquivosRecepcionados = fs.readdirSync('./backup/');
    
    let verificacao = arquivosRecepcionados.filter((arquivo) => {
        
        if(arquivo.toString() == nomeArquivo){
            return arquivo;
        }
    })
    if(verificacao.length > 0){
        return false;
    }
    return true;
}

module.exports = {
    verificarArquivosSalvos,
    salvarArquivoNoBackup,
    deletarArquivosRecepcionados,
    gerarLogAplicacao,
    formatarData,
    gerarLogLeituraArquivos
}