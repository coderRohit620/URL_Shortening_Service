// Simple Definition
// 👉 asyncHandler is a wrapper function that:
// ✔ runs async controllers
// ✔ catches errors automatically
// ✔ sends errors to Express middleware

// 🔥 One-Line Understanding
// 👉 Instead of writing try-catch in every API, we write this function once and reuse it everywhere.

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

