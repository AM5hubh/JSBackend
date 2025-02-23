import { ApiError } from "../utils/ApiError.js";

// errorHandler.js
const errorHandler = (err, req, res, next) => {
  let error = err;

  // If error isn't an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || []);
  }

  // Send error response
  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export { errorHandler };
