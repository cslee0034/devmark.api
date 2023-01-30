import Sequelize from "sequelize";
import configObj from "../config/config.js";
import User from "./user.js";
import Alarm from "./alarm.js";
import Bookmark from "./bookmark.js";
import Box from "./Box.js";
import Memo from "./memo.js";

const env = (process.env.NODE_ENV as "production" | "test") || "development";
const config = configObj[env];

export const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

Alarm.initiate(sequelize);
Bookmark.initiate(sequelize);
Box.initiate(sequelize);
Memo.initiate(sequelize);
User.initiate(sequelize);

Alarm.associate();
Bookmark.associate();
Box.associate();
Memo.associate();
User.associate();
