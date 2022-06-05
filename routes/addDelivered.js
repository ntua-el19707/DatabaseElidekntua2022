const express =  require('express')
const addDelivered_Controller = require('../controllers/addDelivered')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addDelivered_Controller.getDelivered)
module.exports = router 