const express =  require('express')
const editadd_Controller = require('../controllers/editaddress')
const router = express.Router()

router.post('/', editadd_Controller.postEditadd)
module.exports = router;