import { Model, DataTypes } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
import Bookmark from "./bookmark";
import Schedule from "./schedule";
import Post from "./post";

class User extends Model {
  /* User */
  public readonly id!: number;
  public email!: string;
  public password!: string;
  public nickname!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /* Relationship */
  public readonly Bookmarks?: Bookmark[];
  public readonly Schedules?: Schedule[];
  public readonly Posts?: Post[];
  public readonly Followers?: User[];
  public readonly Followings?: User[];

  /* GET SET Methods */
}

User.init(
  {
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.User.hasMany(db.Bookmark, { foreignKey: "Users", sourceKey: "id" });
  db.User.hasMany(db.Schedule, { foreignKey: "Users", sourceKey: "id" });
  db.User.hasMany(db.Post, { foreignKey: "Users", sourceKey: "id" });
  db.User.belongsToMany(db.User, {
    through: "Follow",
    as: "Follower",
    foreignKey: "followingId",
  });
  db.User.belongsToMany(db.User, {
    through: "Follow",
    as: "Followings",
    foreignKey: "followerId",
  });
};

export default User;
