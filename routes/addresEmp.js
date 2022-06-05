const express =  require('express')
const addemprel_Controller = require('../controllers/addEmployee_relation')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addemprel_Controller.getMain)
module.exports = router 