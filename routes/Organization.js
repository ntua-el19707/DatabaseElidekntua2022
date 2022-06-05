const express =  require('express')
const Orga_Controller = require('../controllers/Organization')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', Orga_Controller.getMain)
router.get('/:id/Researchers', Orga_Controller.OrgResearchers)
module.exports = router 