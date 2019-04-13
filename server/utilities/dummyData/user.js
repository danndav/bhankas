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



export default user;