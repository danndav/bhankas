import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import queryProivider from '../utilities/queries';

chai.use(chaiHttp);
chai.should();

let userToken = '';

before(() => {
  const email = 'tester@gmail.com';
  return queryProivider.deleteUserByEmailQuery(email).then((res) => {
    console.log(res);
  }).catch(() => {});
});



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

    it('it should not signup user that exist', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: "aworenidapo@gmail.com",
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
            .to.equals('User with this email aworenidapo@gmail.com exists already', );

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
    })
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
});