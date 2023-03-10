const UserServices = require("../services/userServices");
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");

const createUser = async (req, res) => {
  try {
    console.log("getUsers");
    const myPlaintextPassword = req.body.password;

    // hashing user password
    const hash = bcrypt.hashSync(myPlaintextPassword, 10);

    // const lastUser = users[0].userId;
    // const idNumber = Number(lastUser.split(`-`)[1]);
    const newBody = {
      ...req.body,
      password: hash,
      // userId: `SSD-${idNumber + 1}`,
      // sd: idNumber + 1,
    };
    const document = await UserServices.createUser(newBody);
    console.log("document: ", document);
    const { userId, username, password } = document;
    console.log("userid: ", userId);
    // siginig/authenticating user with jwt token for authorization
    const token = jwt.sign(
      { userId, username, password },
      process.env.jwtSecret,
      {
        expiresIn: `30d`,
      }
    );
    delete document._doc.password;
    // delete document._doc.sd;
    // server response
    res.status(200).json({ ...document._doc, token: `Bearer ${token}` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    console.log("getUsers");
    let limitQP = Number(req.query.limit) ?? 100;
    if (limitQP > 100) limitQP = 100;
    if (limitQP < 1) limitQP = 1;

    let skipQP = Number(req.query.skip) ?? 0;
    if (skipQP < 0) skipQP = 0;

    let sortByQP = Number(req.query.sortBy) ?? { userId: 1 };

    const filterQP = null; // temporary

    const [docArray, docCount] = await UserServices.getUsers(
      filterQP,
      sortByQP,
      skipQP,
      limitQP
    );

    let message = "good";
    if (docArray.length === 0) message = "list is empty change your query";

    return successResponse(res, message, docArray, docCount);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.files[0].location) {
      return res.status(401).json({ error: "Please upload a picture" });
    }
    const users = await UserServices.updateUser(
      { _id: req.params.id },
      { userFile: req.files[0].location },
      { new: true }
    );
    if (!users) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json({
      users,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    console.log("login");
    const { username, password } = req.body;
    const doc = await UserServices.getUser({
      username,
    });
    if (!doc) {
      return badRequestErrorResponse(
        res,
        `Either username or password is invalid`
      );
    }
    const hashedPassword = doc.password;

    const { userId, role } = doc;

    // comparing hashed password
    const hash = await bcrypt.compare(password, hashedPassword);
    if (!hash) {
      return badRequestErrorResponse(
        res,
        `Either username or password is invalid`
      );
    }
    const token = jwt.sign(
      { userId: userId, username, role },
      process.env.jwtSecret,
      {
        expiresIn: `30d`,
      }
    );

    res.cookie("access_token", `Bearer ${token}`, {
      expires: new Date(Date.now() + 720 * 3600000),
      httpOnly: true,
      path: `/`,
    });

    // removing password from doc
    doc.password = undefined;
    // delete doc.password; Does not work
    // delete doc[password]; Does not work

    return successResponse(
      res,
      messageUtil.loginSuccessful,
      doc,
      undefined,
      `Bearer ${token}`
    );
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const RegisterAppToken = async (req, res) => {
  console.log("req.body", req.body);
  let user;
  try {
    user = await UserServices.updateUserById(
      { _id: req.userId },
      { userAppToken: req.body.registrationToken }
    );
    console.log("????  ~ user:", user);
    if (!user) {
      return notFoundResponse(res, messageUtil.notFound);
    }

    return successResponse(res, messageUtil.tokenRegistered, user);
  } catch (err) {
    serverErrorResponse(res, err);
  }
};

const GetAll = async (req, res) => {
  try {
    let users = await UserServices.getAllUser();
    if (users.length < 1) {
      return notFoundResponse(res, messageUtil.notFound);
    }

    return successResponse(res, messageUtil.found, users);
  } catch (err) {
    serverErrorResponse(res, err);
  }
};

const SendNotification = async (req, res) => {
  let user;
  try {
    user = await UserServices.getUser({ _id: req.userId });
    if (!user) {
      return notFoundResponse(res, messageUtil.notFound);
    }
    let title = `Hello ${user.first_name}`;
    let body = `Notification from sapdasoft`;
    singleNotification(title, body, user.userAppToken);

    return successResponse(res, "Notification sent", user);
  } catch (err) {
    serverErrorResponse(res, err);
  }
};

const SendNotificationToUsers = async (req, res) => {
  try {
    let { users } = req.body;
    console.log("???? ~ users:", users);
    let array = [];

    for (let i = 0; i < users.length; i++) {
      let user = await UserServices.getUser({ _id: users[i] });
      if (user.userAppToken) {
        array.push(user.userAppToken);
      }
    }
    console.log("array", array);

    multipleNotification(array);

    return successResponse(res, "Notification sent");
  } catch (err) {
    serverErrorResponse(res, err);
  }
};

const logout = async (req, res) => {
  try {
    console.log("logout");
    return successResponse(res, messageUtil.logoutSuccessful);
  } catch (err) {
    serverErrorResponse(res, err);
  }
};
module.exports = {
  createUser,
  getUsers,
  updateUser,
  GetAll,
  login,
  logout,
  RegisterAppToken,
  SendNotification,
  SendNotificationToUsers,
};
