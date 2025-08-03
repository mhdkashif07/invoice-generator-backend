export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Validation Error",
      errors: err.errors,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }

  // Default error
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
