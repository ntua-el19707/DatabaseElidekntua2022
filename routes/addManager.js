const express =  require('express')
const addManager_Controller = require('../controllers/addManager')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addManager_Controller.getMain)
router.post('/', addManager_Controller.addManager)
module.exports = router 