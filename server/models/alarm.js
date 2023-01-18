import Sequelize, { Model, } from "sequelize";
import Bookmark from "./bookmark.js";
class Alarm extends Model {
    static initiate(sequelize) {
        Alarm.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            time: {
                type: Sequelize.DATE,
                allowNull: false,
                unique: true,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Alarm",
            tableName: "alarms",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate() {
        Alarm.belongsToMany(Bookmark, { through: "BookmarkAlarm" });
    }
}
export default Alarm;
