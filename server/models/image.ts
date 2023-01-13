import { Model, DataTypes } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
import Post from "./post";

class Image extends Model {
  /* Image */
  public readonly id!: number;
  public src!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

  /* Relationship */
  public readonly Posts?: Post[];
}

Image.init(
  {
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "image",
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.Image.belongsTo(db.Post, { foreignKey: 'Posts', targetKey: 'id'});
};

export default Image;
