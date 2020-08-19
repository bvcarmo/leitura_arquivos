const leituraArquivos = require('./app/leitura_arquivos/leitura_arquivos')
const bancoDeDados = require('./app/banco_de_dados/banco_de_dados')
const app = require('./app/app')

bancoDeDados.iniciaBanco();

app.iniciarServidor();

//A leitura de arquivos ocorre a cada 10 minutos
setInterval(() => {
    leituraArquivos.lerArquivos()
},600000);
