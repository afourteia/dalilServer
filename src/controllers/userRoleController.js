const UserRoleServices = require("../services/userRoleServices");

const CreateUserRole = async (req, res) => {
  console.log("req.locals: ", req.userId);
  try {
    const document = await UserRoleServices.createUserRole({
      ...req.body,
      createdBy: req.userId,
      updatedBy: req.userId,
    });

    // server response
    res.status(200).json({ ...document._doc, message: "Role created!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const GetAllRoles = async (req, res) => {
  try {
    const roles = await UserRoleServices.getAllUserRoles({});

    res.status(200).json({
      roles,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const UpdateUserRole = async (req, res) => {
  try {
    const userRole = await UserRoleServices.updateUserRole(
      { _id: req.params.id },
      { ...req.body }
    );
    if (!userRole) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json({
      userRole,
      message: "User role updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { CreateUserRole, GetAllRoles, UpdateUserRole };
