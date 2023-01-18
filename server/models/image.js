import Sequelize, { Model, } from 'sequelize';
import Post from './post.js';
class Image extends Model {
    static initiate(sequelize) {
        Image.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            src: {
                type: Sequelize.STRING(200),
                allowNull: false,
                unique: true,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Image',
            tableName: 'images',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate() {
        Image.belongsTo(Post);
    }
}
export default Image;
