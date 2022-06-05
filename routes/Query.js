const express =  require('express');
const QueryController = require('../controllers/Query');
const router = express.Router();
//Routing refers to how an application’s endpoints (URIs) respond to client requests. 
// create a new router object to hanndle request
/*
fix later
router.get('/', layoutController.getLanding);*/
router.get('/', QueryController.getMain);
module.exports = router ;