A API foi feita utilizando Node JS e o Frontend da aplicação foi feito em Angular 9.

Para executar a API é necessário digitar os seguintes comandos dentro da pasta api: npm install e posteriormente npm install.

A API está lendo dois tipos de arquivos txt e csv. Para a leitura dos arquivos txt é necessário que os registros estejam divididos pelo conjunto de caracteres " -- ".

Na pasta backup contém algum arquivos txt para teste.

Para executar o frontend da aplicação é necessário estar executando a API também.

O frontend pode ser executado com o comando ng serve --open do Angular CLI 9 sendo executado dentro da pasta frontend

ou pode usar a versão que já foi feita o build dentro da pasta Dist, instalando um serve pelo yarn com o comando 

yarn global add serve e posteriormente executando o comando serve dist.

