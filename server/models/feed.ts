import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import { BelongsToManyGetAssociationsMixin } from "sequelize/types/associations";
import User from "./user.js";

class Feed extends Model<InferAttributes<Feed>, InferCreationAttributes<Feed>> {
  declare id: CreationOptional<number>;
  declare FeedName: string;
  declare FeedContent: string;
  declare img: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare UserId: ForeignKey<User["id"]>;


  static initiate(sequelize: Sequelize.Sequelize) {
    Feed.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        FeedName: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        FeedContent: {
          // 내용 최대길이: 200
          type: Sequelize.STRING(200),
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
        modelName: "Feed",
        tableName: "feeds",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate() {
  }
}

export default Feed;
