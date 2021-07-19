const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use((req, __, next) => {
    console.log("Request body:", req.body)
    next();
  });

app.get('/', (__, res) => {
    res.send('hello')
})

app.use('/api', routes)

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports.handler = serverless(app);