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
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Post;
}(sequelize_1.Model));
Post.init({
    contentType: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "Post",
    tableName: "post",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
});
var associate = function (db) {
    db.Post.belongsTo(db.User, { foreignKey: "Users", targetKey: "id" });
    db.Post.hasMany(db.Comment, { foreignKey: "Posts", sourceKey: "id" });
    db.Post.hasMany(db.Hashtag, { foreignKey: "Posts", sourceKey: "id" });
    db.Post.hasMany(db.Image, { foreignKey: "Posts", sourceKey: "id" });
};
exports.associate = associate;
exports["default"] = Post;
