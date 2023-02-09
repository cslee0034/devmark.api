import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import Bookmark from "./bookmark.js";
import User from "./user.js";

class Alarm extends Model<
  InferAttributes<Alarm>,
  InferCreationAttributes<Alarm>
> {
  declare id: CreationOptional<number>;
  declare time: Date;
  declare alarmName: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare UserId: ForeignKey<User["id"]>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Alarm.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        alarmName: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        time: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Alarm",
        tableName: "alarms",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate() {
    Alarm.belongsTo(User);
  }
}

export default Alarm;
