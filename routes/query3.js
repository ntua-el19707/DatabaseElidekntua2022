const express =  require('express');
const query3Controller = require('../controllers/query3');
const router = express.Router();

router.get('/', query3Controller.getMain);
module.exports = router ;