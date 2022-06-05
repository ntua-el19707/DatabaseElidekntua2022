const express =  require('express')
const deleteMang_Controller = require('../controllers/deleteManager')
const router = express.Router()
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/

router.post('/:id', deleteMang_Controller.postDeleteMang)
module.exports = router 