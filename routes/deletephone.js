const express =  require('express')
const deletephone_Controller = require('../controllers/deletephone')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/

router.post('/:id', deletephone_Controller.postDeletephone)
module.exports = router 