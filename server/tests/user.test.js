import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import queryProivider from '../utilities/queries';

chai.use(chaiHttp);
chai.should();

let userToken = '';
let clientToken = ''


before(() => {
  const email = 'tester@gmail.com';
  return queryProivider.deleteUserByEmailQuery(email).then((res) => {

  }).catch(() => {});
});


before(() => {
  it('it should login user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dahni9elisrealud@gmail.com',
        password: 'danisreal',
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
  });


  it('it should login user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dahnielisreajl@gmail.com',
        password: 'danisreal',
      })
      .end((err, res) => {
        clientToken = res.body.data.token;
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
  });
});

describe('UNIT TESTS FOR DUMMY USER CONTROLLERS', () => {
  /*
   * Test the /GET route
   */
  describe('/GET REQUEST', () => {
    it('it should GET all users', (done) => {
      chai
        .request(server)
        .get('/api/v1/users/')
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.body.should.have
            .property('message')
            .to.equals('Successfully fetched all users');
          res.should.have.property('status').to.equals(200);
          // res.body.should.have.property('data').to.be.an('object');
          done();
        });
    });

    it('it should not GET all users with unathenticated', (done) => {
      chai
        .request(server)
        .get('/api/v1/users/')
        .set('authorization', `Bearer ${clientToken}`)
        .end((err, res) => {
          res.body.should.have
            .property('error')
            .to.equals('You are not authorized to perform this action');
          res.should.have.property('status').to.equals(403);
          // res.body.should.have.property('data').to.be.an('object');
          done();
        });
    });

    it('it should not GET all users with unathenticated', (done) => {
      chai
        .request(server)
        .get('/api/v1/users/')
        .set('authorization', `Bearer ${345676}`)
        .end((err, res) => {
          res.body.should.have
            .property('error')
            .to.equals('Authentication Failed');
          res.should.have.property('status').to.equals(401);
          // res.body.should.have.property('data').to.be.an('object');
          done();
        });
    });
  });
  describe('/POST REQUEST', () => {
    it('it should signup user ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'tester@gmail.com',
          firstName: 'hello',
          lastName: 'Abass',
          phoneNumber: '08023461217',
          password: 'tolaniabass',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          res.body.should.have
            .property('message')
            .to.equals('New user created successfully');
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.a('object');
          done();
        });
    });

    it('it should not signup empty user ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property('message')
            .to.equals('Please fill all fields');
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });

    it('it should not signup empty user ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'tester@gmail.com',
          firstName: 'hel//lo',
          lastName: 'Abass',
          phoneNumber: '08023461217',
          password: 'tolaniabass',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have;
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });


    it('it should not signup empty user ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'tester@gmail.com',
          firstName: 'hello',
          lastName: 'Abas\\s',
          phoneNumber: '08023461217',
          password: 'tolaniabass',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have;
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });

    it('it should not signup user that exist', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'aworenidapo@gmail.com',
          firstName: 'Imodoye',
          lastName: 'David',
          phoneNumber: '08023461217',
          password: 'danielimodoye',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);
          res.body.should.have
            .property('message')
            .to.equals('User with this email exists already');

          done();
        });
    });

    it('it should check for empty user', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
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
  });

  describe('/POST REQUEST', () => {
    it('it should signin user ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'tolaniabass@gmail.com',
          password: 'tolaniabass',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('Authentication Successful');

          done();
        });
    });


    it('it should not  signin user ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
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


    it('it should not  signin user with wrong input', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'tolaniabassgmail.com',
          password: 'tolaniabass',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);


          done();
        });
    });


    it('it should check for unregistered email and wrong password ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'yyysttt@gmail.com',
          password: 'tolaniabass',
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have
            .property('responseMessage')
            .to.equals('Wrong Email and Password Combination. Please Check your credentials');
          done();
        });
    });
  });

  describe('/GET REQUEST', () => {
    it('it should GET all accounts by email', (done) => {
      const email = 'aworenidapo@gmail.com';
      chai
        .request(server)
        .get(`/api/v1/user/${email}/accounts`)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.body.should.have
            .property('message')
            .to.equals('All Accounts Fetched Successfully');
          res.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('Array');

          done();
        });
    });
  });
});