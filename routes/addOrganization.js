const express =  require('express')
const addOrga_Controller = require('../controllers/addOrganization')
const router = express.Router()

router.get('/', addOrga_Controller.getMain)
router.post('/', addOrga_Controller.addOrg)
module.exports = router 