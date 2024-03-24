const express = require("express");
const apiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models/index");
const setupJobs = require('./utils/job-voice-call');
const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server Start on PORT ${PORT}`);
    // db.sequelize.sync({ alter: true });
    setupJobs();
  });
};
prepareAndStartServer();
