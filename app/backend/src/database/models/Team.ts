import { Model, DataTypes } from 'sequelize';
import db from '.';

interface TeamAttributes {
  id: number;
  teamName: string;
}

class Team extends Model<TeamAttributes> implements TeamAttributes {
  public id!: number;
  public teamName!: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'teams',
    underscored: true,
    timestamps: false,
  }
);

export default Team;
