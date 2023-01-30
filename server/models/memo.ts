import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import Bookmark from "./bookmark.js";

class Memo extends Model<InferAttributes<Memo>, InferCreationAttributes<Memo>> {
  declare id: CreationOptional<number>;
  declare memoName: string;
  declare memoContent: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare BookmarkId: ForeignKey<Bookmark["id"]>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Memo.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        memoName: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        memoContent: {
          type: Sequelize.TEXT,
          allowNull: true,
        },

        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Memo",
        tableName: "memos",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate() {
    Memo.belongsTo(Bookmark);
  }
}

export default Memo;
