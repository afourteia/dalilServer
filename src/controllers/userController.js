const UserServices = require("../services/userServices");
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);

const CreateUser = async (req, res) => {
  try {
    const myPlaintextPassword = req.body.password;

    // hashing user password
    const hash = bcrypt.hashSync(myPlaintextPassword, 10);
    const users = await UserServices.getAllUsers();

    if (users.length === 0) {
      const newBody = {
        ...req.body,
        password: hash,
        // userId: `SSD-${1}`,
        // sd: 1,
      };
      const document = await UserServices.createUser(newBody);
      const { _id, username, password } = document;
      // console.log("userId: ", userId);
      // siginig/authenticating user with jwt token for authorization
      const token = jwt.sign(
        { userId: _id, username, password },
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
      delete document._doc.password;
      delete document._doc.sd;
      // server response
      res.status(200).json({ ...document._doc, token: `Bearer ${token}` });
    } else {
      // const lastUser = users[0].userId;
      // const idNumber = Number(lastUser.split(`-`)[1]);
      const newBody = {
        ...req.body,
        password: hash,
        // userId: `SSD-${idNumber + 1}`,
        // sd: idNumber + 1,
      };
      const document = await UserServices.createUser(newBody);
      const { _id, username, password } = document;
      // siginig/authenticating user with jwt token for authorization
      const token = jwt.sign(
        { userId: _id, username, password },
        process.env.jwtSecret,
        {
          expiresIn: `30d`,
        }
      );

      delete document.password;
      // delete document._doc.sd;
      // server response
      res.status(200).json({ ...document._doc, token: `Bearer ${token}` });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const GetUsers = async (req, res) => {
  try {
    // let userIdQuery = req.query.starting_after_object;
    let limitQuery = req.query.limit;

    // if (!userIdQuery) {
    //   userIdQuery = `SSD-0`;
    // }

    if (!limitQuery) {
      limitQuery = 5;
    }

    let limit = Number(limitQuery);
    // if (!userIdQuery.startsWith(`SSD-`)) {
    //   return res.status(404).json({
    //     message: `User not found, check your starting_after_object input`,
    //   });
    // }

    // const idNumber = Number(userIdQuery.split(`-`)[1]);
    if (limit > 100 || limit < 1) {
      limit = 5;
    }
    const totalUsers = await UserServices.getAllUsers({
      // sd: { $gt: idNumber },
    });

    const object = await UserServices.getAllUsers({}, limit);

    if (object.length === 0) {
      return res.status(404).json({
        message: `User not found`,
      });
    }

    // object.forEach((each) => {
    //   delete each.password;
    //   delete each.sd;
    // });

    res.status(200).json({
      object,
      objectCount: totalUsers.length,
      hasMore: object.length >= totalUsers.length ? false : true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const users = await UserServices.updateUser(
      { _id: req.params.id },
      { ...req.body }
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

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const doc = await UserServices.getUserDetails({
      username,
    });
    if (!doc) {
      return res.status(404).json({ message: `username is invalid` });
    }
    const hashedPassword = doc.password;
    const { _id, role } = doc;

    // comparing hashed password
    const hash = await bcrypt.compare(password, hashedPassword);
    if (!hash) {
      return res.status(404).json({ message: `password is invalid` });
    }
    const token = jwt.sign(
      { userId: _id, username, hashedPassword, role },
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

    const responseBody = {
      statusCode: "200",
      message: "good",
      token: `Bearer ${token}`,
      // data: response[0],
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const RegisterAppToken = async (req, res) => {
  let user;
  try {
    user = await UserServices.updateUserById(
      { _id: req.userId },
      { userAppToken: req.body.registrationToken }
    );
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
    console.log("🚀 ~ users:", users);
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

const Logout = async (req, res) => {
  let user;
  try {
    user = await UserServices.updateUserById(
      { _id: req.userId },
      { userAppToken: "" }
    );
    if (!user) {
      return notFoundResponse(res, messageUtil.notFound);
    }

    return successResponse(res, messageUtil.logout, user);
  } catch (err) {
    serverErrorResponse(res, err);
  }
};
module.exports = {
  CreateUser,
  GetUsers,
  UpdateUser,
  GetAll,
  Login,
  Logout,
  RegisterAppToken,
  SendNotification,
  SendNotificationToUsers,
};
