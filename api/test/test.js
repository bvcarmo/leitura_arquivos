const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('', () => 

  describe('/GET Transacoes', () => {
        it('Testando GET de todas as transacoes', (done) => {
            chai.request('http://localhost:3500') 
                .get('/transacoes') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                  done();
                });
        });
  }),

  describe('/GET Arquivos', () => {
    it('Testando GET de todos os arquivos', (done) => {
        chai.request('http://localhost:3500') 
            .get('/arquivos') 
            .end((err, res) => { 
                res.should.have.status(200);
                res.body.should.be.a('array'); 
              done();
            });
    });
  }),

  describe('/GET Estatisticas dos Arquivos', () => {
    it('Testando GET das estatisticas dos arquivos', (done) => {
        chai.request('http://localhost:3500') 
            .get('/arquivos/estatistica') 
            .end((err, res) => { 
                res.should.have.status(200); 
                res.body.should.be.a('object'); 
              done();
            });
    });
  })

  
)