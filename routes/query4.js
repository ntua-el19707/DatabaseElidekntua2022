const express =  require('express');
const query4Controller = require('../controllers/query4');
const router = express.Router();
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', query4Controller.getMain);
module.exports = router ;