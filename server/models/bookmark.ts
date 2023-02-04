import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import {
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
} from "sequelize/types/associations";
import Box from "./box.js";
import Alarm from "./alarm.js";
import Memo from "./memo.js";

class Bookmark extends Model<
  InferAttributes<Bookmark>,
  InferCreationAttributes<Bookmark>
> {
  declare id: CreationOptional<number>;
  declare contentName: string;
  declare URL: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare BoxId: ForeignKey<Box["id"]>;

  declare getMemos: HasManyGetAssociationsMixin<Memo>;
  declare addMemos: HasManyAddAssociationMixin<Memo, number>;
  declare hasMemos: HasManyHasAssociationMixin<Memo, number>;
  declare countMemos: HasManyCountAssociationsMixin;
  declare createMemos: HasManyCreateAssociationMixin<Memo>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Bookmark.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        contentName: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        URL: {
          // URL 최대길이: 2083
          type: Sequelize.STRING(2083),
          allowNull: false,
        },

        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Bookmark",
        tableName: "bookmarks",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate() {
    Bookmark.belongsTo(Box, { targetKey: "id" });
    Bookmark.belongsToMany(Alarm, { through: "BookmarkAlarm" });
    Bookmark.hasMany(Memo, {
      sourceKey: "id",
      foreignKey: "BookmarkId",
    });
  }
}

export default Bookmark;
