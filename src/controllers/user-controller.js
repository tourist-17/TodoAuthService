const UserService = require("../services/user-service");
const useService = new UserService();
const create = async (req, res) => {
  try {
    const response = await useService.create({
      phone_number: req.body.phone_number,
      password: req.body.password,
    });

    return res.status(201).json({
      message: "Successfully created a new user",
      data: response,
      err: {},
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message: error.message,
      data: {},
      err: error.explanation,
      success: false,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await useService.signIn(req.body.phone_number, req.body.password);
    return res.status(200).json({
      message: "Successfully signIn a user",
      data: response,
      err: {},
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message: error.message,
      data: {},
      err: error.explanation,
      success: false,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await useService.isAuthenticated(token); //you get => {email: '', id: '', iat: '', exp: ''}
    console.log(response);
    return res.status(200).json({
      message: "Successfully fetched whether a user is Authenticated or not",
      data: response,
      err: {},
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong in Authentication in controller",
      data: {},
      err: error,
      success: false,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await useService.isAdmin(req.body.id);
    return res.status(200).json({
      message: "Successfully fetched whether a user is admin or not",
      data: response,
      err: {},
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong in controller",
      data: {},
      err: error,
      success: false,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
