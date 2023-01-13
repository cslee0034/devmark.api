import { Model, DataTypes } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
import Post from "./post";

class Hashtag extends Model {
  /* Hashtag */
  public readonly id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

  /* Relationship */
  public readonly Posts?: Post[];
}

Hashtag.init(
  {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Hashtag",
    tableName: "hashtag",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.Hashtag.belongsTo(db.Post, { foreignKey: "Posts", targetKey: "id" });
};

export default Hashtag;
