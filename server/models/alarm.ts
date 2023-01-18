import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import Bookmark from "./bookmark.js";

class Alarm extends Model<
  InferAttributes<Alarm>,
  InferCreationAttributes<Alarm>
> {
  declare id: CreationOptional<number>;
  declare time: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Alarm.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate() {
    Alarm.belongsToMany(Bookmark, { through: "BookmarkAlarm" });
  }
}

export default Alarm;
