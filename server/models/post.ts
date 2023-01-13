import { Model, DataTypes } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
import User from "./user";
import Image from "./image";
import Comment from "./comment";
import Hashtag from "./hashtag";

class Post extends Model {
  /* Post */
  public readonly id!: number;
  public contentType!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

  /* Relationship */
  public readonly Users?: User[];
  public readonly Comments?: Comment[];
  public readonly Hashtags?: Hashtag[];
  public readonly Images?: Image[];
}

Post.init(
  {
    contentType: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "post",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.Post.belongsTo(db.User, { foreignKey: "Users", targetKey: "id" });
  db.Post.hasMany(db.Comment, { foreignKey: "Posts", sourceKey: "id" });
  db.Post.hasMany(db.Hashtag, { foreignKey: "Posts", sourceKey: "id" });
  db.Post.hasMany(db.Image, { foreignKey: "Posts", sourceKey: "id" });
};

export default Post;
