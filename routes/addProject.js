const express =  require('express')
const addProject_Controller = require('../controllers/addProject')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addProject_Controller.getMain)
module.exports = router 