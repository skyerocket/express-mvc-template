const sinon = require('sinon')
const expect = require('chai').expect
const propertyController = require('../controllers/propertyController')
const request = require('supertest')
const app = require('../app')

describe('Property controller', () => {
  describe('POST add property', () => {
    it('should succeed with 201 when content format is right', async () => {
        const response = await request(app)
          .post(`/api/property/add`)
          .send({ address: 'hey', salePrice: 22000, description: 'test' })
        expect(response.status).to.equal(201)
        sinon.restore()
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

  describe('POST add property', () => {
    it('should succeed with 201 when content format is right', async () => {
        const response = await request(app)
          .post(`/api/property/add`)
          .send({ address: 'hey', salePrice: 22000, description: 'test' })
        expect(response.status).to.equal(201)
        sinon.restore()
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