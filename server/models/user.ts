import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import {
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
} from "sequelize/types/associations";
import Box from "./box.js";
import Feed from "./feed.js";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  // 'CreationOptional' is a special type that marks the field as optional
  // id can be undefined during creation when using `autoIncrement`
  declare email: string;
  declare nick: string;
  declare password: CreationOptional<string>;
  declare provider: CreationOptional<string>;
  declare snsId: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  // createdAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare deletedAt: CreationOptional<Date>;
  // ...

  declare getBoxs: HasManyGetAssociationsMixin<Box>;
  declare addBoxs: HasManyAddAssociationMixin<Box, number>;
  declare hasBoxs: HasManyHasAssociationMixin<Box, number>;
  declare countBoxs: HasManyCountAssociationsMixin;
  declare createBoxs: HasManyCreateAssociationMixin<Box>;

  declare getFeeds: HasManyGetAssociationsMixin<Feed>;
  declare addFeeds: HasManyAddAssociationMixin<Feed, number>;
  declare hasFeeds: HasManyHasAssociationMixin<Feed, number>;
  declare countFeeds: HasManyCountAssociationsMixin;
  declare createFeeds: HasManyCreateAssociationMixin<Feed>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao", "github"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate() {
    User.hasMany(Box, {
      sourceKey: "id",
      foreignKey: "UserId",
    });
    User.hasMany(Feed, {
      sourceKey: "id",
      foreignKey: "UserId",
    });
  }
}

export default User;
