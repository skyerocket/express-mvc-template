const exampleData = [
    { address: 'State Library', salePrice: 2000000, description: 'Test Description', suburb: 'Melbourne CBD' },
    { address: 'Another Library', salePrice: 500000, description: 'This is another one', suburb: 'Southbank' },
    { address: 'A Wonderful Place', salePrice: 250000, description: 'Really Great', suburb: 'Caulfield' },
    { address: 'Happy Palace', salePrice: 900000, description: 'Great Great', suburb: 'South Yarra' }
]
const data = [...exampleData]

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