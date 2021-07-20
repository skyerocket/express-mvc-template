const {data} = require('../dal/data')

const addProperty = async property => {
    let sanitizedProperty = property;
    if (!property.suburb) {
        sanitizedProperty = {...property, suburb: ''}
    }
    data.push(sanitizedProperty)
    return sanitizedProperty
}

const searchProperty = async filter => {
    const {suburb} = filter
    if (!suburb) return
    if (suburb.trim().length === 0) return data
    const matches = data.filter(item => {
        const words = item.suburb.split(' ')
        return words.find(word => (word.toLowerCase().includes(suburb.toLowerCase())))
    })
    let results = matches;
    if (results.length > 0) {
        const average = arr => arr.reduce((a, b) => a + b, 0 ) / arr.length;
        const avgSale = average(data.map(item => item.salePrice))
        results.map(entry => ({...entry, avgCompare: entry.salePrice > avgSale}))
    }
    return results
}

module.exports = {
  addProperty,
  searchProperty
}