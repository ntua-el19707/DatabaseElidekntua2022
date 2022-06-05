const express =  require('express')
const Res_Controller = require('../controllers/Researcher')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', Res_Controller.getMain)
module.exports = router