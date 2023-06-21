import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeUser from '../database/models/Users';
import { bodyInvalidEmail, bodyInvalidPass, bodyWithoutEmail, bodyWithoutPass, jwtTokenAdmin, userMock, validBody, validBodyWrongPass } from './mock/mocklogin';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  beforeEach(() => {
    sinon.restore();
  })
  it('', async () => {
       const email = await chai.request(app).post('/login').send(bodyWithoutEmail)
       const password = await chai.request(app).post('/login').send(bodyWithoutPass)
       const iemail = await chai.request(app).post('/login').send(bodyInvalidEmail)
       const ipassword = await chai.request(app).post('/login').send(bodyInvalidPass)
       const loginrole = await chai.request(app).get('/login/role').send();
       const authoInv = await chai.request(app).get('/login/role').set('Authorization', 'invalido');
       expect(email.status).to.be.eq(400);
       expect(email.body).to.have.key('message');
       expect(password.status).to.be.eq(400);
       expect(password.body).to.have.key('message');
       expect(iemail.status).to.be.eq(401);
       expect(iemail.body).to.have.key('message');
       expect(ipassword.status).to.be.eq(401);
       expect(ipassword.body).to.have.key('message');
       expect(loginrole.status).to.be.eq(401);
       expect(loginrole.body).to.have.key('message');
       expect(authoInv.status).to.be.eq(401);
       expect(authoInv.body).to.have.key('message');
     })
     it('', async () => {
          const userInstance = SequelizeUser.build(userMock);
         sinon.stub(SequelizeUser, 'findOne').resolves(userInstance);
         const response = await chai.request(app).post('/login').send(validBody)
         expect(response.status).to.be.eq(200);
         expect(response.body).to.have.key('token');
        });
     it('', async () => {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
      const response = await chai.request(app).post('/login').send(validBody)
      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.key('message');
    })
    it('', async () => {
      const userInstance = SequelizeUser.build(userMock);
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance);
      const response = await chai.request(app).post('/login').send(validBodyWrongPass)
      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.key('message');
    })
});