import { Model, DataTypes } from 'sequelize';
import db from '.';

interface ModelsUsersAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

class ModelsUsers extends Model<ModelsUsersAttributes> implements ModelsUsersAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

ModelsUsers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize: db, underscored: true, timestamps: false, tableName: 'users' }, // nome correto da table
);

export default ModelsUsers;
