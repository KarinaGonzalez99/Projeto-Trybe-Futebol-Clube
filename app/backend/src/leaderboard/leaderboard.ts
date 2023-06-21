import { Request, Response } from 'express';
import Match from '../database/models/Matches';
import Team from '../database/models/Team';

const total = (team: Team, matches: Match[]) => matches.reduce((totalPoints, match) => {
  if (
    match.homeTeamId === team.id
      && match.inProgress === false
  ) {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return totalPoints + 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      return totalPoints + 1;
    }
  }
  return totalPoints;
}, 0);

const games = (team: Team, matches: Match[]) => matches.reduce((totalGames, match) => {
  if (
    match.homeTeamId === team.id
      && match.inProgress === false
  ) {
    return totalGames + 1;
  }
  return totalGames;
}, 0);

const vitorias = (team: Team, matches: Match[]) => matches.reduce((totalVictories, match) => {
  if (
    match.homeTeamId === team.id
      && match.inProgress === false
      && match.homeTeamGoals > match.awayTeamGoals
  ) {
    return totalVictories + 1;
  }
  return totalVictories;
}, 0);

const empate = (team: Team, matches: Match[]) => matches.reduce((totalDraws, match) => {
  if (
    match.homeTeamId === team.id
      && match.inProgress === false
      && match.homeTeamGoals === match.awayTeamGoals
  ) {
    return totalDraws + 1;
  }
  return totalDraws;
}, 0);

const perdas = (team: Team, matches: Match[]) => matches.reduce((totalLosses, match) => {
  if (
    match.homeTeamId === team.id
      && match.inProgress === false
      && match.homeTeamGoals < match.awayTeamGoals
  ) {
    return totalLosses + 1;
  }
  return totalLosses;
}, 0);

const afavor = (team: Team, matches: Match[]) => matches.reduce((goalsFor, match) => {
  if (
    match.homeTeamId === team.id
      && match.inProgress === false
  ) {
    return goalsFor + match.homeTeamGoals;
  }
  return goalsFor;
}, 0);

const contra = (team: Team, matches: Match[]) => matches.reduce((goalsAgainst, match) => {
  if (
    match.homeTeamId === team.id
      && match.inProgress === false
  ) {
    return goalsAgainst + match.awayTeamGoals;
  }
  return goalsAgainst;
}, 0);

const homeleaderboard = (matches: Match[]) => matches.map((match) => {
  const { homeTeam } = match;
  const totalPoints = total(homeTeam, matches);
  const totalGames = games(homeTeam, matches);
  const totalVictories = vitorias(homeTeam, matches);
  const totalDraws = empate(homeTeam, matches);
  const totalLosses = perdas(homeTeam, matches);
  const goalsFavor = afavor(homeTeam, matches);
  const goalsOwn = contra(homeTeam, matches);
  return {
    name: homeTeam.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
  };
});

const getHomeLeaderboard = async (req: Request, res: Response) => {
  try {
    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [{ model: Team, as: 'homeTeam' }],
    });
    //     console.log(homeleaderboard(matches));
    return res.status(200).json(homeleaderboard(matches));
  } catch (error) {
    console.error(error); return res.status(500).json({ message: 'Internal server error' });
  }
};

export default getHomeLeaderboard;
