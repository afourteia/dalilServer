var admin = require("firebase-admin");

var serviceAccount = require("../../test-notification-36f92-firebase-adminsdk-6ogfl-98da7f585e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var registrationToken =
  "enT-54FkaooxgX61IJteLZ:APA91bFCmJBEN4t0l18IxSEOA1b1iL0e1a3R2EbdNIStNSZlBKz0Bn8YeQAhW9xEVb3VJ0fWROrCoXPGUTFhMfAL_bAh1V6eTq0BM_B7CftWY9ksgWUQInr55AUyxUu472JZTBXi5GfM";

const registrationTokens = [
  "enT-54FkaooxgX61IJteLZ:APA91bFCmJBEN4t0l18IxSEOA1b1iL0e1a3R2EbdNIStNSZlBKz0Bn8YeQAhW9xEVb3VJ0fWROrCoXPGUTFhMfAL_bAh1V6eTq0BM_B7CftWY9ksgWUQInr55AUyxUu472JZTBXi5GfM",
  "cfhi40zGeXq-n-d2W3HRoH:APA91bGoC3Ei12V99BedG3XyFSOcYqEyepUf2ksRzKan9s-bo9M2Eavp2t062tsAkqI3FPfSAb29uuruxJHQmEn0uTf_ddeCjlJk9nwRMA7VXfjYIBDzQyyS0wFbo4AEl-lwt0p5EBVx",
];
var payload = {
  data: {
    body: "Hello",
    title: "Spadasoft",
  },
  tokens: registrationTokens,
};

var options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};
//to send to a specific device
// admin
//   .messaging()
//   .sendToDevice(registrationToken, payload, options)
//   .then(function (response) {
//     console.log("Successfully sent message: ", response);
//   })
//   .catch(function (error) {
//     console.log("error in sending", error);
//   });

// to send notification to group of devices
const singleNotification = async (title, body, registrationToken) => {
  var payload = {
    data: {
      body,
      title,
    },
  };

  var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  return admin
    .messaging()
    .sendToDevice(registrationToken, payload, options)
    .then(function (response) {
      console.log("Successfully sent message: ", response);
    })
    .catch(function (error) {
      console.log("error in sending", error);
    });
};
const multipleNotification = async (tokens) => {
  var payload = {
    data: {
      body: "Hello",
      title: "Notification from sapdasoft",
    },
    tokens,
  };

  var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  admin
    .messaging()
    .sendMulticast(payload)
    .then(function (response) {
      //we needs to check the status
      console.log("Successfully sent message: ", response);
    })
    .catch(function (error) {
      console.log("error in sending", error);
    });
};

module.exports = { singleNotification, multipleNotification };
