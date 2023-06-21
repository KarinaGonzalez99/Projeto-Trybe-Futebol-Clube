const matchFactory = (id: number, homeTeamId: number, awayTeamId: number, inProgress: boolean) => ({
     id,
     homeTeamId,
     homeTeamGoals: 1,
     awayTeamId,
     awayTeamGoals: 1,
     inProgress,
   });
   
   export const matchFactory1 = [
     matchFactory(1, 16, 8, false),
     matchFactory(2, 9, 14, false),
     matchFactory(46, 4, 12, true),
   ];
   
   export const matchFactory2 = [
     matchFactory(46, 4, 12, true),
   ];
   
   export const matchFactory3 = [
     matchFactory(1, 16, 8, false),
     matchFactory(2, 9, 14, false),
   ];
   