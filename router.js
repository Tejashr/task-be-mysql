const { Router } = require("express");
const Task = require("./Task/Task");
const router = Router();

module.exports = () => {
  router.use("/test", Task());
  return router;
};
