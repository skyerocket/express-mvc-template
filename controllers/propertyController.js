const propertyService = require('../services/propertyService')

const { addProperty, searchProperty } = propertyService

/*
 * Endpoint to add property with address, sale price, and description.
 * Post: {new property}
 * Return: {status}
*/
const add = async (req, res, next) => {
  try {
    console.log(req.body)
    const {data} = req.body
    await addProperty(data)
    res.sendStatus(201)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

/*
  * Endpoint to search properties using an optional suburb filter.
  * Post: filter(suburb)
  * Return: [{propertyAddress, salePrice, avgCompare},..]
*/
const search = async (req, res, next) => {
  try {
    const {filter} = req.body
    const data = await searchProperty(filter)
    if (data) {
      res.sendStatus(data)
    }
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
  add,
  search
}