const data = []

const addProperty = async property => {
  return data.push(property)
}

const searchProperty = async filter => {
  return true
}

module.exports = {
  addProperty,
  searchProperty
}