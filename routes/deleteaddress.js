const express =  require('express')
const deleteaddress_Controller = require('../controllers/deleteaddress')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/

router.post('/:id', deleteaddress_Controller.postDeleteaddress)
module.exports = router 