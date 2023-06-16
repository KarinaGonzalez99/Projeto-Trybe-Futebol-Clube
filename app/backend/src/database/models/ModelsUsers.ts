import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  public id!: number;
  public teamName!: string;

  static initialize() {
    this.init(
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
      { sequelize: db, underscored: true, timestamps: false },
    );
  }
}

export default Team;
