const sinon = require('sinon')
const expect = require('chai').expect
const propertyController = require('../controllers/propertyController')
const request = require("supertest");
const express = require("express");
const app = express();

describe('Property controller', () => {
  describe('POST add property', () => {
    it('should fail with 500 when throw error', async done => {
        const mError = new Error('connect error');
        sinon.stub(propertyController, 'add').rejects(mError)
        const response = await request(app)
          .post(`/api/property/add`)
          .type("form")
          .send({ item: "hey" })
        expect(response.status).toBe(500);
        done();
    });
  })

  describe('POST search property', () => {
    it('should use show action and send response', async () => {
      const findOne = sinon
        .stub(queries, 'getSpecificPost')
        .resolves(specificPost)
      let resSpy = sinon.spy()
      const req = {
        params: {
          id: 1,
        },
      }
      const res = {
        status: () => {
          return {
            send: resSpy,
          }
        },
      }

      const spy = sinon.spy(res, 'status')
      await show(req, res)

      expect(findOne.calledOnce).to.equal(true)
      expect(spy.calledOnce).to.equal(true)
      expect(resSpy.calledOnce).to.equal(true)
      expect(resSpy.calledWith(specificPost)).to.equal(true)

      findOne.restore()
    })
  })
})