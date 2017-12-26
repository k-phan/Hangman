# Hangman
Server/Client Hangman Game

## Run Instructions
To run this game...
* Install MongoDB
    ``` sudo apt-get install mongodb ``` or 
    ``` sudo eopkg install mongodb ```
* Install Node.js and Node Package Manager
    * This link may be helpful: [Instructions to Install Node.js](https://nodejs.org/en/download/package-manager/)
* Start up MongoDB
    ``` sudo systemctl start mongodb ``` or 
    ``` sudo service start mongodb ```
* Navigate to **_/Hangman/src/_** after cloning the repository
    * Execute ```npm install```
    * There is a **_.env-sample_** file in this directory, create a copy of it and name it **_.env_**
        * Information is as follows
    ```
    NODE_ENV=development
    MONGO_IP= ip address of MongoDB, should be localhost or 127.0.0.1
    MONGO_PORT= port MongoDB is running on, default port is 27017
    MONGO_DB_NAME= name of the database, a simple string like hangman should be okay
    EXPRESS_SECRET= secret for your express sessions, a simple string should also be okay
    PORT= port for the app to listen on, default is 3000
    ```
    * An example of a **_.env_** is as follows
    ```
    NODE_ENV=development
    MONGO_IP=localhost
    MONGO_PORT=27017
    MONGO_DB_NAME=hangman
    EXPRESS_SECRET=secretpassword
    PORT=3000
    ```
    * Execute ```npm start``` in the **_src_** directory and open up the game on **http://localhost:3000/**
    ** Or check it out at [Hangman](hangman.khaiphan.me) *new!!* **

## Technologies
* Node.js
* MongoDB
* Passport.js
* Express.js
* Mocha

## Notes
* Used Sublime Text 3 with JSLint
* To run tests, execute ```npm test```