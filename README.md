[![Coverage Status](https://coveralls.io/repos/github/danndav/bhankas/badge.svg?branch=ch-165331606-integrate-travis-ci-coveralls)](https://coveralls.io/github/danndav/bhankas?branch=ch-165331606-integrate-travis-ci-coveralls) [![Build Status](https://travis-ci.org/danndav/bhankas.svg?branch=develop)](https://travis-ci.org/danndav/bhankas) [![Maintainability](https://api.codeclimate.com/v1/badges/94e81f1ec3fcb4311f32/maintainability)](https://codeclimate.com/github/danndav/bhankas/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/94e81f1ec3fcb4311f32/test_coverage)](https://codeclimate.com/github/danndav/bhankas/test_coverage)

# bhankas

Bhanka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals

## Access running application

- [UI](https://danndav.github.io/bhankas/UI/)
- [HEROKU](https://bhanka.herokuapp.com/)
- [Pivotal Tracker board](https://www.pivotaltracker.com/n/projects/2320360)

## Features

- Users can create an sign up and log in.
- Users can create bank account.
- Users can view account transaction history.
- Users can view specific account transaction.
- Staff can debit and credit user account.
- Admin/staff can view all user accounts.
- Admin/staff can view a specific user account.
- Admin/staff can activate or deactivate an account.
- Admin/staff can delete a specific account.
- Admin can create staff and admin user accounts.

## Endpoints

| Request Type | Endpoint                                 | Action :arrow_upper_right:        |
| ------------ | ---------------------------------------- | --------------------------------- |
| POST         | _/api/v1/auth/signup_                    | Signup a user                     |
| POST         | _/api/v1/auth/login_                     | Login a user                      |
| POST         | _/api/v1/accounts_                       | Create bank account               |
| PATCH        | _/api/v1/accounts/:accountNumber_        | Activate or deactivate an account |
| DELETE       | _/api/v1/accounts/:accountNumber_        | Delete a bank account             |
| POST         | _/api/v1/accounts/:accountNumber/debit_  | Debit a bank account              |
| POST         | _/api/v1/accounts/:accountNumber/credit_ | Credit a bank account             |

## Getting Started

Instructions to get the project running successfully on your terminal

### Prerequisites

You need to have these installed before cloning the project

- [Nodejs](https://nodejs.org/en/download/)

### Technologies Used

- [NodeJS](https://nodejs.org)
- [Express](https://expressjs.com)
- [Mocha](https://mochajs.org)
- [Chai](www.chaijs.com)
- [istanbul](https://istanbul.js.org)
- [Eslint](https://eslint.org/)
- [Babel](https://babeljs.io/)
- [Covealls](https://coveralls.io/)

## Style Guide

:smile: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/)

## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
2. Clone the [**repository here**](https://github.com/danndav/bhankas.git)
3. [**cd**] into the root of the **project directory**.
4. Run `npm install` on the terminal to install Dependecies
5. run `npm start` on the terminal to start the application

```
cd bhankas

npm install

npm start
```

## Testing

Testing is used at key checkpoints in the overall process to determine whether objectives are being met. It also speed up software development process

Sever side tests - Run `npm test` on the terminal while within the \*\*project root

## Acknowledgments

:clap: :clap: :clap: :clap: :+1: :+1: :smile:

- [Andela](http://andela.com)
- [Dribbble](https://dribbble.com)

## Author

:large_blue_circle: :persevere: [David Imodoye Daniel](https://github.com/danndav/bhankas)

## License

This project is licensed under the **MIT** License
