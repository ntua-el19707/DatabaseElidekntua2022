const express =  require('express')
const addreasea_Controller = require('../controllers/addResearcher')
const router = express.Router()
//Routing refers to how an application�s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addreasea_Controller.getMain)
module.exports = router 