import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
chai.should();

let userToken = '';
let user = '';
let clientToken = '';


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


describe('UNIT TESTS FOR Accounts', () => {
    /*
     * Test the /GET route
     */
    describe('/GET REQUEST', () => {
        it('it should GET all accounts', (done) => {
            chai
                .request(server)
                .get('/api/v1/accounts/')
                .set('authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.body.should.have
                        .property('message')
                        .to.equals('Successfully fetched all Accounts');
                    res.should.have.property('status').to.equals(200);
                    res.body.should.have.property('data').to.be.an('array');
                    done();
                });
        });

        it('it should not account unauthorised', (done) => {
            chai
                .request(server)
                .get('/api/v1/accounts/')
                .set('authorization', `Bearer ${clientToken}`)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.have.property('status').to.equals(403);
                    res.body.should.have
                        .property('error')
                        .to.equals('You are not authorized to perform this action');


                    done();
                });
        });

        it('it should GET all active status', (done) => {
            const activestatus = 'active';
            chai
                .request(server)
                .get(`/api/v1/accounts/?status=${activestatus}`)
                .set('authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    // console.log(res)
                    res.body.should.have
                        .property('message')
                        .to.equals(`All ${activestatus} status Successfully fetched`);
                    res.should.have.property('status').to.equals(200);
                    res.body.should.have.property('data').to.be.an('array');
                    done();
                });
        });


        it('it should not get status', (done) => {
            const activestatus = 'dorman';
            chai
                .request(server)

                .get(`/api/v1/accounts/?status=${activestatus}`)
                .set('authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    // console.log(res)
                    res.body.should.have
                        .property('message')
                        .to.equals(` ${activestatus} status not valid`);
                    res.should.have.property('status').to.equals(400);

                    done();
                });
        });
    });

    describe('UNIT TESTS FOR Accounts', () => {
        /*
         * Test the /GET route
         */
        describe('/GET REQUEST', () => {
            it('it should GET all accounts details', (done) => {
                const accounNumber = 5366652541;
                chai
                    .request(server)
                    .get(`/api/v1/accounts/${accounNumber}`)
                    .set('authorization', `Bearer ${userToken}`)
                    .end((err, res) => {
                        res.body.should.have
                            .property('message')
                            .to.equals('Account Details fetched Successfully');
                        res.should.have.property('status').to.equals(200);
                        res.body.should.have.property('data').to.be.an('array');
                        done();
                    });
            });

            it('it should not GET all accounts details', (done) => {
                chai;
                const accounNumber = 123456789;
                chai
                    .request(server)
                    .get(`/api/v1/accounts/${accounNumber}`)
                    .set('authorization', `Bearer ${userToken}`)
                    .end((err, res) => {
                        res.body.should.have
                            .property('error')
                            .to.equals('Account details could not be fetched');
                        res.should.have.property('status').to.equals(400);
                        done();
                    });
            });
        });
    });


    describe('UNIT TESTS FOR Accounts', () => {
        /*
         * Test the /GET route
         */
        describe('/GET REQUEST', () => {
            it('it should GET all Transactions details', (done) => {
                const accounNumber = 1200777775;
                chai
                    .request(server)
                    .get(`/api/v1/accounts/${accounNumber}/transactions`)
                    .set('authorization', `Bearer ${userToken}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have
                            .property('message')
                            .to.equals('Transactions fetched  Successfully');
                        res.should.have.property('status').to.equals(200);
                        res.body.should.have.property('data').to.be.an('array');
                        done();
                    });
            });

            it('it should not GET all accounts details', (done) => {
                chai;
                const accounNumber = 123456789;
                chai
                    .request(server)
                    .get(`/api/v1/accounts/${accounNumber}/transactions`)
                    .set('authorization', `Bearer ${userToken}`)
                    .end((err, res) => {
                        res.body.should.have
                            .property('error')
                            .to.equals('Transactions could not be fetched');
                        res.should.have.property('status').to.equals(400);
                        done();
                    });
            });
        });
    });


    describe('UNIT TESTS FOR Accounts', () => {
        /*
         * Test the /GET route
         */
        describe('/GET REQUEST', () => {
            it('it should GET all Transaction By id', (done) => {
                const userid = 3;
                chai
                    .request(server)
                    .get(`/api/v1/transactions/${userid}`)
                    .set('authorization', `Bearer ${userToken}`)
                    .end((err, res) => {
                        res.body.should.have
                            .property('message')
                            .to.equals('Transaction Detail fetched Successfully');
                        res.should.have.property('status').to.equals(200);
                        res.body.should.have.property('data').to.be.an('array');
                        done();
                    });
            });

            it('it should not GET all accounts details', (done) => {
                chai;
                const userid = 300;
                chai
                    .request(server)
                    .get(`/api/v1/transactions/${userid}`)
                    .set('authorization', `Bearer ${userToken}`)
                    .end((err, res) => {
                        res.body.should.have
                            .property('error')
                            .to.equals('Transactions details could not be fetched');
                        res.should.have.property('status').to.equals(400);
                        done();
                    });
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
                        balance: 1290,
                    })
                    .end((err, res) => {
                        user = res.body.data.accountNumber;
                        console.log('must new account create', res.body.data.accountNumber);
                        res.should.have.status(201);
                        res.body.should.have.property('status').to.equals(201);
                        res.body.should.have.property('data').to.be.an('object');
                        res.body.should.have
                            .property('message')
                            .to.equals('New Account created successfully');

                        done();
                    });
            });

            it('it should not create empty bank account ', (done) => {
                chai
                    .request(server)
                    .post('/api/v1/accounts')
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


            it('it should not create  bank account unauthorised ', (done) => {
                chai
                    .request(server)
                    .post('/api/v1/accounts')
                    .set('authorization', `Bearer ${23456}`)
                    .send({
                        type: 'current',
                        balance: 1290,
                    })
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.body.should.have.property('status').to.equals(403);
                        res.body.should.have
                            .property('error')
                            .to.equals('user not found, please register to perform this action');

                        done();
                    });
            });


            it('it should not create  bank account with wrong parameters ', (done) => {
                chai
                    .request(server)
                    .post('/api/v1/accounts')
                    .set('authorization', `Bearer ${userToken}`)
                    .send({
                        type: 'current',
                        balance: 'fgh',
                    })
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.have.property('status').to.equals(400);

                        done();
                    });
            });

            // it('it should not create bank account ', (done) => {
            //     chai
            //         .request(server)
            //         .post('/api/v1/accounts')
            //         .set('authorization', `Bearer ${userToken}`)
            //         .send({
            //             type: 'current',
            //             balance: 123,
            //         })
            //         .end((err, res) => {

            //             res.should.have.status(400);
            //             res.body.should.have.property('status').to.equals(400);
            //             res.body.should.have
            //                 .property('message')
            //                 .to.equals('Could not create Account');

            //             done();
            //         });
            // });
        });
    });


    describe('/PATCH REQUEST', () => {
        it('it should patch account ', (done) => {
            const accounNumber = 1200777775;
            chai
                .request(server)
                .patch(`/api/v1/accounts/${accounNumber}`)
                .set('authorization', `Bearer ${userToken}`)
                .send({
                    status: 'dormant',
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').to.equals(200);
                    res.body.should.have.property('data').to.be.an('object');
                    res.body.should.have
                        .property('message')
                        .to.equals('account Status Updated Successfully');


                    done();
                });
        });

        it('it should not patch unavailabe account ', (done) => {
            const accounNumber = 1234568;
            chai
                .request(server)
                .patch(`/api/v1/accounts/${accounNumber}`)
                .set('authorization', `Bearer ${userToken}`)
                .send({
                    status: 'active',
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('status').to.equals(404);
                    res.body.should.have
                        .property('error')
                        .to.equals('This account does not exist');


                    done();
                });
        });


        it('it should not account unauthorised', (done) => {
            const accounNumber = user;
            chai
            chai
                .request(server)
                .patch(`/api/v1/accounts/${accounNumber}`)
                .set('authorization', `Bearer ${3456}`)
                .send({
                    status: 'active',
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('status').to.equals(401);
                    res.body.should.have
                        .property('error')
                        .to.equals('Authentication Failed');


                    done();
                });
        });
    });

    describe('/DELETE REQUEST', () => {
        it('it should delete account ', (done) => {
            const accounNumber = user;
            chai
                .request(server)
                .delete(`/api/v1/accounts/${accounNumber}`)
                .set('authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').to.equals(200);
                    res.body.should.have
                        .property('message')
                        .to.equals('Account Number deleted Successfully');


                    done();
                });
        });



        it('it should not delete unfound  account ', (done) => {
            const accounNumber = 234567;
            chai
                .request(server)
                .delete(`/api/v1/accounts/${accounNumber}`)
                .set('authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have
                        .property('error')
                        .to.equals('This account  does not exist');

                    done();
                });
        });
    });
});