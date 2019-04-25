CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR (500) UNIQUE NOT NULL,
    firstname VARCHAR (500) NOT NULL,
    lastname VARCHAR (500) NOT NULL,
    password VARCHAR (500) NOT NULL,
    phonenumber VARCHAR NOT NULL,
    createdon VARCHAR (500) NOT NULL,
    type VARCHAR NOT NULL,
    isAdmin BOOLEAN NOT NULL
);

 
-- CREATE ACCOUNT TABLE

CREATE TABLE accounts
(
    id SERIAL PRIMARY KEY,
    accountNumber VARCHAR (500) UNIQUE NOT NULL,
    createdon VARCHAR (500) NOT NULL,
    owner_id INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users (id),
    type VARCHAR (500) NOT NULL,
    status VARCHAR (500) NOT NULL,
    balance VARCHAR (500) NOT NULL
    
);

-- CREATE Transaction TABLE

CREATE TABLE transactions
(
    id SERIAL PRIMARY KEY,
    createdon VARCHAR (500) NOT NULL,
    type VARCHAR (500) NOT NULL,
    accountNumber VARCHAR (500) NOT NULL,
    FOREIGN KEY (accountNumber) REFERENCES accounts (accountNumber),
    cashier_id INT NOT NULL,
    FOREIGN KEY (cashier_id) REFERENCES users (id),
    amount VARCHAR (500) NOT NULL,
    oldBalance VARCHAR (500) NOT NULL,
    newBAlance VARCHAR  (500) NOT NULL 

);
