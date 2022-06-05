const express =  require('express')
const addcompa_Controller = require('../controllers/addCompany')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addcompa_Controller.getCompany)
module.exports = router 