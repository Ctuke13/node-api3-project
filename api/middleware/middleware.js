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
      next({ status: 404, message: `Hub ${req.params.id} not found` });
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
