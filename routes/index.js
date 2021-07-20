const express = require('express')
const { check } = require('express-validator');

const propertyController = require('../controllers/propertyController')

const router = express.Router()

router.post('/property/add',
    [
        check('address').not().isEmpty().withMessage('Must include address'),
        check('salePrice').not().isEmpty().withMessage('Must include salePrice'),
        check('description').not().isEmpty().withMessage('Must include description'),
    ],
    propertyController.add)
router.post('/property/search', 
    [
        check('suburb').not().isEmpty().withMessage('Must include suburb'),
    ],
    propertyController.search)

module.exports = router