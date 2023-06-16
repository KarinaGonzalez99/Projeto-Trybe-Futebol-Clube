import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste /teams', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Deve retornar todos os times corretamente', async () => {
    const findAllStub = sinon.stub(Team, 'findAll');
    const mockTeamsData = [
      {
        id: 1,
        teamName: 'Avaí/Kindermann',
      },
      {
        id: 2,
        teamName: 'Bahia',
      },
      {
        id: 3,
        teamName: 'Botafogo',
      },
    ];
    const mockTeams = mockTeamsData.map((teamData) => new Team(teamData));
    findAllStub.resolves(mockTeams);

    const response = await chai.request(app).get('/teams');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(mockTeamsData);
    expect(findAllStub.calledOnce).to.be.true;
  });
});
