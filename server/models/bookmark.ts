import { Model, DataTypes } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
import User from "./user";

class Bookmark extends Model {
  /* Bookmark */
  public readonly id!: number;
  public adress!: string;
  public box!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

  /* Relationship */
  public readonly Users?: User[];
}

Bookmark.init(
  {
    adress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    box: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Bookmark",
    tableName: "bookmark",
    charset: "utf8", // utf8 + 이모티콘
    collate: "utf8_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.Bookmark.belongsTo(db.User, { foreignKey: 'Users', targetKey: 'id'});
};

export default Bookmark;
