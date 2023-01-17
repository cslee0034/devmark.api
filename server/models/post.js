import Sequelize, { Model, } from 'sequelize';
import User from './user.js';
import Hashtag from './hashtag.js';
class Post extends Model {
    static initiate(sequelize) {
        Post.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            content: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate() {
        Post.belongsTo(User);
        Post.belongsToMany(Hashtag, { through: 'PostHashtag' });
    }
}
export default Post;
