const { statusCodes } = require("http-status-codes");
class AppErrors extends Error {
  constructor(
    name = "AppError",
    message = "Something went wrong",
    explanation = "Something went wrong",
    statusCode = statusCodes.INTERNAL_SERVER_ERROR
  ) {
    super();
    this.message = message,
    this.explanation = explanation,
    this.name = name,
    this.statusCode = statusCode;
  }
}

module.exports = AppErrors;