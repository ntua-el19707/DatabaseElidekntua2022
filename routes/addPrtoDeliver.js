const express =  require('express')
const addPrtoDeliver_Controller = require('../controllers/addPrtoDeliver')
const router = express.Router()
//Routing refers to how an application�s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addPrtoDeliver_Controller.getMain)
module.exports = router 