const express =  require('express')
const editOrga_Controller = require('../controllers/editOrganization')
const router = express.Router()

router.post('/', editOrga_Controller.postEditOrga)
module.exports = router;