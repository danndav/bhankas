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
            chai
                .request(server)
                .post('/api/v1/auth/transactions/:accountNumber/credit')
                .send({
                    amount: 200.20,
                    cachier: 2,
                })
                .end((err, res) => {
                    res.should.have.property('status').to.equals(200);
                    res.body.should.have.property('data').to.be.an('array');
                    done();
                });
        });
        it('it should reject unavailable account ', (done) => {
            chai
                .request(server)
                .post('/api/v1/auth/transactions/:accountNumber/credit')
                .send({
                    amount: 200.20,
                    cachier: 2,
                })
                .end((err, res) => {
                    res.should.have.property('error').to.equals(404);
                    res.body.should.have
                        .property('error')
                        .to.equals('This account  does not exist');

                    done();
                });
        });

    });
});