const express =  require('express')
const editphone_Controller = require('../controllers/editPhones')
const router = express.Router()

router.post('/', editphone_Controller.postEditphone)
module.exports = router;