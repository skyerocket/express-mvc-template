# express-mvc-template

API /api/property/add

API /api/property/search

#### Swagger

https://app.swaggerhub.com/apis/yangfei0777/API-Property/1

#### Endpoints

POST SEARCH : https://x8xlkf18rl.execute-api.us-east-1.amazonaws.com/dev/api/property/search

POST ADD: https://x8xlkf18rl.execute-api.us-east-1.amazonaws.com/dev/api/property/add

GET / : https://x8xlkf18rl.execute-api.us-east-1.amazonaws.com/dev/

#### Assumptions

1. case insensitive partial search by suburb, passing other filter won't have any affect
2. have to pass the desired format to pass validator, for example {suburb : 'xx'}, {suburbb : 'xxx'} will return validation error
3. search nothing returns all
4. suburb when add is optional if not specified return ''

#### To run locally

`npm install && node app.js`

`npm run test` for integration test