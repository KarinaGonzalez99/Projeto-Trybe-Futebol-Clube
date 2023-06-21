import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { leaderBoard, leaderBoardHome } from './mock/mockleader';

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('LeaderBoard', () => {
    it('', async function () {
      const response = await chai.request(app).get('/leaderboard');
      console.log(response.body, 'response.body')
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(leaderBoard);
    });
    it('', async function () {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(leaderBoardHome);
    });
});