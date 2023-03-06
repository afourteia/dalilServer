// importing users collection
const user = require(`../schemas/userSchema`);
// importing  dependencies
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);

// api for creating new user

const createUsers = async (req, res) => {
  try {
    const myPlaintextPassword = req.body.password ?? "123";

    // hashing user password
    const hash = bcrypt.hashSync(myPlaintextPassword, 10);
    const users = await user.find().sort({ userId: -1 }).limit(1);

    if (users.length === 0) {
      const newBody = {
        ...req.body,
        password: hash,
        userId: `SSD-${1}`,
        sd: 1,
      };
      const document = await user.create(newBody);
      const { userId, username, password } = document._doc;

      // siginig/authenticating user with jwt token for authorization
      const token = jwt.sign(
        { userId, username, password },
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
      document.statusCode = 
      // server response
      res.status(200).json({ ...document._doc,statusCode: "200", token: `Bearer ${token}` });
    } else {
      const lastUser = users[0].userId;
      const idNumber = Number(lastUser.split(`-`)[1]);
      const newBody = {
        ...req.body,
        password: hash,
        userId: `SSD-${idNumber + 1}`,
        sd: idNumber + 1,
      };
      const document = await user.create(newBody);
      const { userId, username, password } = document._doc;
      // siginig/authenticating user with jwt token for authorization
      const token = jwt.sign(
        { userId, username, password },
        process.env.jwtSecret,
        {
          expiresIn: `30d`,
        }
      );
      delete document._doc.password;
      delete document._doc.sd;
      // server response
      res.status(200).json({ ...document._doc,statusCode: "200", token: `Bearer ${token}` });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({statusCode: "500", message: error.message });
  }
};

// api for getting all users
const getUsers = async (req, res) => {
  try {
    let userIdQuery = req.query.starting_after_object;
    let limitQuery = req.query.limit;

    if (!userIdQuery) {
      userIdQuery = `SSD-0`;
    }

    if (!limitQuery) {
      limitQuery = 5;
    }

    let limit = Number(limitQuery);
    if (!userIdQuery.startsWith(`SSD-`)) {
      return res.status(404).json({
        statusCode: "404",
        message: `User not found, check your starting_after_object input`,
      });
    }

    const idNumber = Number(userIdQuery.split(`-`)[1]);
    if (limit > 100 || limit < 1) {
      limit = 5;
    }
    const totalUsers = await user.find({
      sd: { $gt: idNumber },
    });

    const object = await user
      .find({
        sd: { $gt: idNumber },
      })
      .limit(limit)
      .lean();

    if (object.length === 0) {
      return res.status(404).json({
        statusCode: "404",
        message: `User not found`,
      });
    }

    object.forEach((each) => {
      delete each.password;
      delete each.sd;
    });

    res.status(200).json({
      statusCode: "200",
      object,
      objectCount: totalUsers.length,
      hasMore: object.length >= totalUsers.length ? false : true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({statusCode: "500", message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.files[0].location) {
      return res.status(401).json({ error: "Please upload a picture" });
    }
    const users = await user.findOneAndUpdate(
      { _id: req.params.id },
      { userFile: req.files[0].location },
      { new: true }
    );
    if (!users) {
      return res.status(404).json({statusCode: "404", error: "No user found" });
    }
    res.status(200).json({
      statusCode: "200",
      users,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({statusCode: "404", message: error.message });
  }
};

module.exports = { createUsers, getUsers, updateUser };
