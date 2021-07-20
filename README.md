# express-mvc-template

API /api/property/add

API /api/property/search

#### Swagger


#### API url
POST SEARCH : https://x8xlkf18rl.execute-api.us-east-1.amazonaws.com/dev/api/property/search

POST ADD: https://x8xlkf18rl.execute-api.us-east-1.amazonaws.com/dev/api/property/add

GET / : https://x8xlkf18rl.execute-api.us-east-1.amazonaws.com/dev/

#### Assumptions 
1. case insensitive partial search by suburb, passing other filter won't have any affect
2. have to pass the desired format to pass validator
3. search nothing returns all

#### To run locally
`npm install && node app.js`

`npm run test` for integration test