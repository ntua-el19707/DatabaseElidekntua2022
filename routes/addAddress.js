const express =  require('express');
const addaddressController = require('../controllers/addaddress');
const router = express.Router();
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', addaddressController.getView);
router.post('/', addaddressController.getaddress);
module.exports = router ;