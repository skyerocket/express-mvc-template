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
/*
* Middleware to prevent Error: Can't set headers after they are sent to the client
* https://stackoverflow.com/a/43671944
*/
app.use((__,res,next) => { 
    var _send = res.send;
   var sent = false;
   res.send = function(data){
       if(sent) return;
       _send.bind(res)(data);
       sent = true;
   };
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