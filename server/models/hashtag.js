"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.associate = void 0;
var sequelize_1 = require("sequelize");
var sequelize_2 = require("./sequelize");
var Hashtag = /** @class */ (function (_super) {
    __extends(Hashtag, _super);
    function Hashtag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Hashtag;
}(sequelize_1.Model));
Hashtag.init({
    name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "Hashtag",
    tableName: "hashtag",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
});
var associate = function (db) {
    db.Hashtag.belongsTo(db.Post, { foreignKey: "Posts", targetKey: "id" });
};
exports.associate = associate;
exports["default"] = Hashtag;
