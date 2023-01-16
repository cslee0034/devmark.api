import express from "express";
export const test = express.Router();
test.get("/", (req, res) => {
    res.send({ test: "hi" });
});
