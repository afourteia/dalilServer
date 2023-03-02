const jwt = require(`jsonwebtoken`);
const UserServices = require("../services/userServices");
const messageUtil = require("./message");
const {
  serverErrorResponse,
  authorizationErrorResponse,
} = require("./response");

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return authorizationErrorResponse(res, messageUtil.tokenNotFound);
  }
  const auth = req.headers.authorization;
  try {
    const payload = jwt.verify(auth.split(` `)[1], process.env.jwtSecret);
    // res.locals.id = payload._id;
    res.locals.user = payload;
    if (!auth.startsWith(`Bearer `) || !payload) {
      return authorizationErrorResponse(res, messageUtil.tokenInvalid);
    }
    req.userId = payload.userId;
    next();
  } catch (error) {
    //   checking for server errors
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const isAdmin = (req, res, next) => {
  // console.log(req.headers.authorization)
  if (!req.headers.authorization) {
    return authorizationErrorResponse(res, messageUtil.tokenNotFound);
  }
  const auth = req.headers.authorization;
  const payload = jwt.verify(auth.split(` `)[1], process.env.jwtSecret);
  if (!auth.startsWith(`Bearer `) || !payload) {
    return authorizationErrorResponse(res, messageUtil.tokenInvalid);
  }
  // res.locals.id = payload._id;
  res.locals.user = payload;
  if (payload.role !== "admin") {
    return authorizationErrorResponse(res, messageUtil.unauthorized);
  }
  next();
};

const checkAccess = async (req, res, next) => {
  const auth = req.headers.authorization;
  const payload = jwt.verify(auth.split(` `)[1], process.env.jwtSecret);

  let allowed = false;
  res.locals.user = payload;

  let getUserRole = await UserServices.getUserDetails({ _id: payload.userId });

  getUserRole.userRole?.forEach((each) => {
    if (each.apiPrivilages?.includes(req.originalUrl)) {
      allowed = true;
    }
  });
  if (!allowed) {
    return authorizationErrorResponse(res, messageUtil.unauthorized);
  }
  next();
};

const cookieVerification = (req, res, next) => {
  // const { access_token } = req.cookies;
  // if (!access_token) {
  //   return res.status(401).json({ message: `No Authorization` });
  // }
  // const payload = jwt.verify(access_token.split(` `)[1], process.env.jwtSecret);
  // if (!access_token.startsWith(`Bearer `)) {
  //   return res.status(401).json({ message: `Authorization credentials not valid` });
  // }
  // res.locals.user = payload;
  next();
};

module.exports = { authentication, cookieVerification, isAdmin, checkAccess };
