const express =  require('express');
const query2view2Controller = require('../controllers/query2view2');

const router = express.Router();
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', query2view2Controller.getMain);
module.exports = router ;