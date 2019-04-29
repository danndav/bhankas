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

CREATE TABLE accounts(
    
   id SERIAL PRIMARY KEY,
    accountNumber VARCHAR (500) UNIQUE NOT NULL,
    createdon VARCHAR (500) NOT NULL,
    owner INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ownerEmail VARCHAR (355) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    type VARCHAR (20) NOT NULL DEFAULT 'savings',
    status VARCHAR (10) NOT NULL DEFAULT 'active',
    balance VARCHAR (500) NOT NULL
    
);

-- CREATE Transaction TABLE



CREATE TABLE transactions(
 id serial PRIMARY KEY,
 type VARCHAR (500) NOT NULL ,
 accountNumber VARCHAR (500) NOT NULL REFERENCES accounts(accountNumber) ON DELETE CASCADE,
 cashier INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 amount NUMERIC (500),
 oldBalance NUMERIC (500),
 newBalance NUMERIC (500),
 createdon VARCHAR (500) NOT NULL
);