const express =  require('express');
const layoutController = require('../controllers/layout');
const router = express.Router();
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', layoutController.getMain);
module.exports = router ;