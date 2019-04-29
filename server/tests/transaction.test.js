import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
chai.should();


let userToken = '';


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

describe('UNIT TESTS FOR DUMMY TRANSACTION CONTROLLERS', () => {
  /*
   * Test the /GET route
   */
  // describe('/GET REQUEST', () => {
  //     it('it should GET all transactions', (done) => {
  //         chai
  //             .request(server)
  //             .get('/api/v1/transactions/')
  //             .end((err, res) => {
  //                 res.body.should.have
  //                     .property('message')
  //                     .to.equals('Successfully fetched all Transactions');
  //                 res.body.should.have.property('status').to.equals(200);
  //                 res.body.should.have.property('data').to.be.an('array');
  //                 done();
  //             });
  //     });
  // });

  describe('/POST REQUEST', () => {
    it('it should credit an account ', (done) => {
      const accountNumber = 3449390654;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('authorization', `Bearer ${userToken}`)
        .send({
          amount: 33200,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals(200);
          // res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('New Transaction successful');


          done();
        });
    });


    it('it should reject unavailable acccount ', (done) => {
      const accountNumber = 1222233333344;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('authorization', `Bearer ${userToken}`)
        .send({
          amount: 200,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.have.property('status').to.equals(404);
          res.body.should.have
            .property('error')
            .to.equals('This account does not exist');

          done();
        });
    });
  });


  describe('/POST REQUEST', () => {
    it('it should debit an account ', (done) => {
      const accountNumber = 3449390654;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('authorization', `Bearer ${userToken}`)
        .send({
          amount: 60.00,
        })
        .end((err, res) => {
          // res.should.have.status(200);
          // res.body.should.have.property('status').to.equals(200);
          console.log(res)
          // res.body.should.have.property('data').to.be.an('object');


          done();
        });
    });


    // it('it should reject if requested amount is greater than balance  ', (done) => {
    //     const accountNumber = 987654321;
    //     chai
    //         .request(server)
    //         .post(`/api/v1/transactions/${accountNumber}/debit`)
    //         .set('authorization', `Bearer ${userToken}`)
    //         .send({
    //             amount: 5000000.20,
    //             cachier: 3,
    //         })
    //         .end((err, res) => {
    //             res.should.have.status(400);
    //             res.should.have.property('status').to.equals(400);
    //             res.body.should.have
    //                 .property('error')
    //                 .to.equals('This account  does not exist');

    //             done();
    //         });
    // });


    it('it should reject unavailable acccount ', (done) => {
      const accountNumber = 11112222222;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('authorization', `Bearer ${userToken}`)
        .send({
          amount: 200,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.have.property('status').to.equals(404);
          // res.body.should.have
          //   .property('error')
          //   .to.equals('This account does not exist');

          done();
        });
    });

    it('it should check for empty amount ', (done) => {
      const accountNumber = 3449390654;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('authorization', `Bearer ${userToken}`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);
          res.body.should.have
            .property('message')
            .to.equals('Please fill all fields');

          done();
        });
    });


    it('it should check for empty amount ', (done) => {
      const accountNumber = 3449390654;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('authorization', `Bearer ${userToken}`)
        .send({
          amount: -200,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });



  });


});