const Users = require("../users/users-model.js");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({ status: 404, message: `User ${req.params.id} not found` });
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    req.name = name.trim();
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (
    text !== undefined &&
    typeof text === "string" &&
    text.length &&
    text.trim().length
  ) {
    req.text = text.trim();
    next();
  } else {
    next({ status: 400, message: "missing required text" });
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
