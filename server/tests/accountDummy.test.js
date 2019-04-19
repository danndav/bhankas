import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
chai.should();

let userToken = '';
const userTokens = '';


before(() => {
  it('it should login user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'aworenidapo@gmail.com',
        password: 'dapoaworeni',
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
  });
});


describe('UNIT TESTS FOR DUMMY USER Accounts', () => {
  /*
   * Test the /GET route
   */
  describe('/GET REQUEST', () => {
    it('it should GET all accounts', (done) => {
      chai
        .request(server)
        .get('/api/v1/accounts/')
        .end((err, res) => {
          res.body.should.have
            .property('message')
            .to.equals('Successfully fetched all accounts');
          res.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });
  });

  describe('UNIT TESTS TO CREATE BANK ACCOUNT', () => {
    describe('/POST REQUEST', () => {
      it('it should create bank account ', (done) => {
        chai
          .request(server)
          .post('/api/v1/accounts')
          .set('authorization', `Bearer ${userToken}`)
          .send({
            type: 'current',
            balance: 123,
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('status').to.equals(201);
            res.body.should.have.property('data').to.be.an('object');
            res.body.should.have
              .property('message')
              .to.equals('Account created successfully');
            // console.log(res)
            // console.log("hello Token", userToken)
            done();
          });
      });


    });
  });


  describe('/PATCH REQUEST', () => {
    it('it should patch account ', (done) => {
      const accounNumber = 123456789;
      chai
        .request(server)
        .patch(`/api/v1/accounts/${accounNumber}`)
        .set('authorization', `Bearer ${userToken}`)
        .send({
          status: 'inactive',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('account status changed  successfull');


          done();
        });
    });


  });

  describe('/DELETE REQUEST', () => {
    it('it should delete account ', (done) => {
      const accounNumber = 123456789;
      chai
        .request(server)
        .delete(`/api/v1/accounts/${accounNumber}`)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have
            .property('message')
            .to.equals('Account Succesfully deleted');


          done();
        });
    });

    it('it should not delete unfound  account ', (done) => {
      const accounNumber = 1098766549;
      chai
        .request(server)
        .delete(`/api/v1/accounts/${accounNumber}`)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property('message')
            .to.equals('This account  does not exist');

          done();
        });
    });
  });
});