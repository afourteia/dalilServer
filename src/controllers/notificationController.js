const {
  singleNotification,
  multipleNotification,
} = require("../utilities/notificationSender");

class Notification {
  SendNotificationOnSingleDevice = async (req, res) => {
    //need to pass single device token

    try {
      let title = `Hello user!`;
      let body = `Notification from dalil server`;
      singleNotification(title, body, user.userAppToken);

      return res.status(200).json({
        message: "Notification sent.",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  SendNotificationToMultipleDevices = async (req, res) => {
    //need to pass an array of device tokens
    try {
      let { tokens } = req.body;

      multipleNotification(tokens);

      return res.status(200).json({
        message: "Notifications sended successfully.",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
module.exports = new Notification();
