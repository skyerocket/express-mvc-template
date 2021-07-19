const express = require('express')

const propertyController = require('../controllers/propertyController')

const router = express.Router()

router.post('/property/add', propertyController.add)
router.post('/property/search', propertyController.search)

module.exports = router