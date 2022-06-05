const express =  require('express')
const addEval_Controller = require('../controllers/addEval')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addEval_Controller.getEvaluation)
module.exports = router 