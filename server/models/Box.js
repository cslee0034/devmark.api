import Sequelize, { Model, } from 'sequelize';
import User from './user.js';
class Box extends Model {
    static initiate(sequelize) {
        Box.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            box: {
                type: Sequelize.STRING(15),
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
            modelName: 'Box',
            tableName: 'boxs',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate() {
        Box.belongsTo(User);
    }
}
export default Box;
