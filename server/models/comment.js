import Sequelize, { Model, } from "sequelize";
import Post from "./post.js";
import User from "./user.js";
class Comment extends Model {
    static initiate(sequelize) {
        Comment.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            content: {
                type: Sequelize.STRING(100),
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Comment",
            tableName: "comments",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate() {
        Comment.belongsTo(User);
        Comment.belongsTo(Post);
    }
}
export default Comment;
