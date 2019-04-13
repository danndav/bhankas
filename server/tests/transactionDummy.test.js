import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
chai.should();

describe('UNIT TESTS FOR DUMMY TRANSACTION CONTROLLERS', () => {
  /*
     * Test the /GET route
     */
  describe('/GET REQUEST', () => {
    it('it should GET all transactions', (done) => {
      chai
        .request(server)
        .get('/api/v1/getTransactions/')
        .end((err, res) => {
          res.body.should.have
            .property('message')
            .to.equals('Successfully fetched all Transactions');
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });
  });

  describe('/POST REQUEST', () => {
    it('it should credit an account ', (done) => {
      const accountNumber = 987654321;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .send({
          amount: 33200,
          cachier: 3,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.an('object');


          done();
        });
    });


    it('it should reject unavailable acccount ', (done) => {
      const accountNumber = 11682992799;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .send({
          amount: 200.20,
          cachier: 3,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.have.property('status').to.equals(404);
          res.body.should.have
            .property('error')
            .to.equals('This account  does not exist');

          done();
        });
    });
  });


  describe('/POST REQUEST', () => {
    it('it should debit an account ', (done) => {
      const accountNumber = 987654321;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .send({
          amount: 33,
          cachier: 3,
        })
        .end((err, res) => {
          console.log(res);

          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.an('object');


          done();
        });
    });


    it('it should reject if requested amount is greater than balance  ', (done) => {
      const accountNumber = 987654321;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .send({
          amount: 5000000.20,
          cachier: 3,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.property('status').to.equals(400);
          res.body.should.have
            .property('error')
            .to.equals('insufficent account balance');

          done();
        });
    });


    it('it should reject unavailable acccount ', (done) => {
      const accountNumber = 11682992799;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .send({
          amount: 200.20,
          cachier: 3,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.property('status').to.equals(400);
          res.body.should.have
            .property('error')
            .to.equals('This account  does not exist');

          done();
        });
    });
  });
});
