const express =  require('express')
const deleteOrga_Controller = require('../controllers/deleteOrganization')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.post('/:id', deleteOrga_Controller.postDeleteOrga)
module.exports = router 