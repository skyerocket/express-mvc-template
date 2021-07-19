const data = []

const addProperty = async property => {
    let sanitizedProperty = property;
    if (!property.suburb) {
        sanitizedProperty = {...property, suburb: ''}
    }
    data.push(sanitizedProperty)
    return sanitizedProperty
}

const searchProperty = async filter => {
  return true
}

module.exports = {
  addProperty,
  searchProperty
}