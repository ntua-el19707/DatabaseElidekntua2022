const express =  require('express')
const editMan_Controller = require('../controllers/editManager')
const router = express.Router()

router.post('/', editMan_Controller.postEditMang)
module.exports = router;