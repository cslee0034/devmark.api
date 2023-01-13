import { Model, DataTypes } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
import User from "./user";

class Schedule extends Model {
  /* Schedule */
  public readonly id!: number;
  public scheduleName!: string;
  public startDate!: Date;
  public endDate!: Date;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

  /* Relationship */
  public readonly Users?: User[];
}

Schedule.init(
  {
    scheduleName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Schedule",
    tableName: "schedule",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.Schedule.belongsTo(db.User, {foreignKey: 'Users', targetKey: 'id'});
};

export default Schedule;
