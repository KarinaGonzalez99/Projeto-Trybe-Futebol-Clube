import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { matchFactory1, matchFactory2, matchFactory3 } from './mock/mockmatch';
import MatchesModels from '../database/models/Matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match', () => {
  beforeEach(() => {
    sinon.restore();
  })
    it('', async () => {
      const modelsMatched = MatchesModels.bulkBuild(matchFactory3)
      sinon.stub(MatchesModels, 'findAll').resolves(modelsMatched)
      const res = await chai.request(app).get('/matches');
      expect(res.status).to.be.eq(200);
      expect(res.body).to.be.deep.eq(matchFactory3);
    });
    it('', async () => {
      const modelsMatched = MatchesModels.bulkBuild(matchFactory2)
      sinon.stub(MatchesModels, 'findAll').resolves(modelsMatched)
      const res = await chai.request(app).get('/matches?inProgress=true');
      expect(res.status).to.be.eq(200);
      expect(res.body).to.be.deep.eq(matchFactory2);
    });
    it('', async () => {
      const modelsMatched = MatchesModels.bulkBuild(matchFactory1)
      sinon.stub(MatchesModels, 'findAll').resolves(modelsMatched)
      const res = await chai.request(app).get('/matches?inProgress=false');
      expect(res.status).to.be.eq(200);
      expect(res.body).to.be.deep.eq(matchFactory1);
   });
   
});
