const cron = require("node-cron");
const UserService = require("../services/user-service");
const userService = new UserService();
const {
  TWILIO_URL,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  MY_PHONE_NUMBER,
} = require("../config/serverConfig");
/**
 * 12:00 am
 * This will run job at 12:00 am every day
 * we will check the dueDate and update the priority of task
 */

const setupJobs = async () => {
  cron.schedule("0 0 * * *", async () => {
    const response = await userService.getAllUserSortByPriority();
    response.forEach(async (user) => {
    //   console.log(user.dataValues);
      const accountSid = TWILIO_ACCOUNT_SID;
      const authToken = TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);

      client.calls
        .create({
          url: TWILIO_URL,
          to: MY_PHONE_NUMBER,
          from: "+919519041954",
        })
        .then((call) => console.log(call.sid));
    });
  });
};
module.exports = setupJobs;
