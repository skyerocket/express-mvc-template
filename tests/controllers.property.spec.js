const sinon = require('sinon')
const expect = require('chai').expect
const propertyController = require('../controllers/propertyController')
const request = require('supertest')
const {app} = require('../app')
const {exampleData} = require('../dal/data')
const partial =
[
    {
        "address": "Another Library",
        "salePrice": 500000,
        "description": "This is another one",
        "suburb": "Southbank"
    },
    {
        "address": "Happy Palace",
        "salePrice": 900000,
        "description": "Great Great",
        "suburb": "South Yarra"
    }
]

describe('Property controller', () => {
  // test post first as using in memory data
  describe('POST search property', () => {
    afterEach(function () {
        sinon.restore();
    });

    it('should return all when send empty suburb', async () => {
        const response = await request(app)
          .post(`/api/property/search`)
          .send({ suburb: ' ' })
        expect(response.body).to.eql(exampleData)
    })

    it('should fail with 422 when not sending suburb filter', async () => {
        const response = await request(app)
          .post(`/api/property/search`)
          .send({ notSuburb: 'hey'})
        expect(response.status).to.equal(422)
    })

    it('should correctly return partial search data', async() => {
        const response = await request(app)
          .post(`/api/property/search`)
          .send({ suburb: 'south'})
        expect(response.body).to.eql(partial)
    })

    it('should fail with 500 when throw error', async () => {
        const stub = sinon.stub(propertyController, 'search').rejects(new Error('connect error'))
        await request(app)
        .post('/api/property/search')
        .send()
        .catch((err, res) => {
            sinon.assert.calledWith(stub, 1);
            expect(res).to.have.status(500);
            expect(err).to.be.null;
            expect(res.body.error).to.be.equal('stub: Internal server error');
            done();
        });
    });
  })

  describe('POST add property', () => {
    afterEach(function () {
        sinon.restore();
    });

    it('should succeed with 201 when content format is right', async () => {
        const response = await request(app)
          .post(`/api/property/add`)
          .send({ address: 'hey', salePrice: 22000, description: 'test' })
        expect(response.status).to.equal(201)
    })

    it('should fail with 422 when content format is wrong', async () => {
        const response = await request(app)
          .post(`/api/property/add`)
          .send({ salePrice: 22000, description: 'test' })
        expect(response.status).to.equal(422)
    })

    it('should fail with 500 when throw error', async () => {
        const stub = sinon.stub(propertyController, 'add').rejects(new Error('connect error'))
        await request(app)
        .post('/api/property/add')
        .send()
        .catch((err, res) => {
            sinon.assert.calledWith(stub, 1);
            expect(res).to.have.status(500);
            expect(err).to.be.null;
            expect(res.body.error).to.be.equal('stub: Internal server error');
            done();
        });
    });
  })
})