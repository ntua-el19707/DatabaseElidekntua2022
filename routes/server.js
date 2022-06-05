const express = require('express')
// you also need to install chalk 
//chalk is library that modify print text change cololr bold size
const chalk = require("chalk")//npm install chalk@4.1.2 -> VERSION 5 
//THAT IS THE CURRENT ISNT  SUPPORTED FOR require
//more info https://www.npmjs.com/package/chalk

//chalk is library that modify print text change cololr bold size
//const chalk = require("chalk")//npm install chalk@4.1.2 -> VERSION 5 
//THAT IS THE CURRENT ISNT  SUPPORTED FOR require
//more info https://www.npmjs.com/package/chalk

//const app = express()
const app = require('./app') // ./app is the tyhe build in web data-base
const port = process.env.SERVER_PORT || 3000 
const error = chalk.bold.red('150%')
const success = chalk.green
//const express = require('express')

//This line  mean  what_ever the port is in the enviroment  or 3000(initial)
app.listen(port, err => {
        if(err){
            console.log(error('Could not set up Server in Port: ',port))
            throw err
        }
    console.log(success('Server Started in Port: ',port))
    })
