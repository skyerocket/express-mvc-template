const propertyService = require('../services/propertyService')
const { validationResult } = require('express-validator')
const { addProperty, searchProperty } = propertyService

/*
  * Endpoint to add property with address, sale price, and description.
  * Post: {new property}
  * Return: {status}
*/
const add = async (req, res, next) => {
  try {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
      res.status(422).send(errors) && next()
    }
    const data = req.body
    const result = await addProperty(data)
    if (result) {
      res.status(201).send(result) && next()
    }
    res.status(400).send({msg: 'Bad Request'}) // if somehow cannot push object
  } catch(e) {
    console.log(e.message)
    res.status(500) && next(e)
  }
}

/*
  * Endpoint to search properties using an optional suburb filter.
  * Post: filter(suburb)
  * Return: [{propertyAddress, salePrice, avgCompare},..]
*/
const search = async (req, res, next) => {
  try {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
      res.status(422).send(errors) && next()
    } 
    const filter = req.body
    const results = await searchProperty(filter)
    res.status(200).send(results) && next()
  } catch(e) {
    console.log(e.message)
    res.status(500) && next(e)
  }
}

module.exports = {
  add,
  search
}