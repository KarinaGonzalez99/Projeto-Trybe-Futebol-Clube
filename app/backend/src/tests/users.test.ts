import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team';
import { teams } from './mock/mockteams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  it('', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teams as any);
      const { body, status } = await chai.request(app).get('/teams');
      expect(status).to.be.eq(200);
      expect(body).to.be.deep.eq(teams);
  });
  it('', async () => {
    const team = teams[0];
    sinon.stub(TeamModel, "findByPk").resolves(team as any);
    const { body, status } = await chai.request(app).get('/teams/1');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(team);
  });
});