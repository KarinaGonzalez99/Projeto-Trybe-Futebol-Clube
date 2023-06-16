import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      teamName: {
        allowNull: false,
        field: 'team_name',
        type: DataTypes.STRING
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('teams');
  }
};
