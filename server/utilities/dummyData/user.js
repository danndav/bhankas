import helperClass from '../../utilities/dummyHelper'
const user = [
        {
            id: 1,
            email: 'danielimodoye@gmail.com',
            firstName: 'Imodoye',
            lastName: 'David',
            phoneNumber:'08023461217',
            password: helperClass.hashPassword('imodoyedavid'),
            type: 'client',
            isAdmin: false
        },{
            id: 2,
            email: 'tolaniabass@gmail.com',
            firstName: 'Tolani',
            lastName: 'Abass',
            phoneNumber:'08023461217',
            password: helperClass.hashPassword('tolaniabass'),
            type: 'client',
            isAdmin: false
        }, {
            id: 3,
            email: 'sannimicheal@gmail.com',
            firstName: 'sanni',
            lastName: 'Micheal',
            phoneNumber:'08023461217',
            password: helperClass.hashPassword('sannimicheal'),
            type: 'staff',
            isAdmin: false
        }, {
            id: 4,
            email: 'aworenidapo@gmail.com',
            firstName: 'Aworeni',
            lastName: 'Oladapo',
            password: helperClass.hashPassword('dapoaworeni'),
            type: 'staff',
            isAdmin: true

        }
    ]

    // account: [
    //     {
    //         id: 1,
    //         accountNumber: 123456789,
    //         createdOn: 'Friday, 6th April 2019',
    //         owner: 1,
    //         type: 'savings',
    //         status: 'active',
    //         balance:5000

    //     }, {
    //         id: 2,
    //         accountNumber: 987654321,
    //         createdOn: 'Friday, 1st Yanuary 2019',
    //         owner: 2,
    //         type: 'current',
    //         status: 'dormant',
    //         balance:20000
            
    //     }
    // ],

    // transaction: [
    //     {
    //         id: 1,
    //         createdOn: 'Friday, 1st Yanuary 2019',
    //         type: 'credit',
    //         accountNumber: 12345678,
    //         cashier: '',
    //         amount: 10000,
    //         oldbalance: 20000,
    //         newBalance:10000
    //     }
    // ]


export default user;