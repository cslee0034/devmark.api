import Sequelize, { Model, } from "sequelize";
import Box from "./Box.js";
import Alarm from "./alarm.js";
class Bookmark extends Model {
    static initiate(sequelize) {
        Bookmark.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            URL: {
                // URL 최대길이: 2083
                type: Sequelize.STRING(2083),
                allowNull: false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Bookmark",
            tableName: "bookmarks",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate() {
        Bookmark.belongsTo(Box);
        Bookmark.belongsToMany(Alarm, { through: "BookmarkAlarm" });
    }
}
export default Bookmark;
