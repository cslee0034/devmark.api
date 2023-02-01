import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ForeignKey,
} from "sequelize";
import {
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
} from "sequelize/types/associations";
import Bookmark from "./bookmark.js";
import User from "./user.js";

class Box extends Model<InferAttributes<Box>, InferCreationAttributes<Box>> {
  declare id: CreationOptional<number>;
  declare box: string;
  declare img: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare UserId: ForeignKey<User["id"]>;

  declare getBookmarks: HasManyGetAssociationsMixin<Bookmark>;
  declare addBookmarks: HasManyAddAssociationMixin<Bookmark, number>;
  declare hasBookmarks: HasManyHasAssociationMixin<Bookmark, number>;
  declare countBookmarks: HasManyCountAssociationsMixin;
  declare createBookmarks: HasManyCreateAssociationMixin<Bookmark>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Box.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        box: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Box",
        tableName: "boxs",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate() {
    Box.belongsTo(User, { targetKey: "id" });
    Box.hasMany(Bookmark, {
      sourceKey: "id",
      foreignKey: "BoxId",
    });
  }
}

export default Box;
