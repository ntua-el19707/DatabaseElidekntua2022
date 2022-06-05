const express =  require('express');
const query1Controller = require('../controllers/query1');

const router = express.Router();
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', query1Controller.getMain);
module.exports = router ;