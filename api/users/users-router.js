const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(`REQ USER: ${req.body.name}`);
  Users.update(req.params.id, req.body)
    .then((user) => {
      console.log(`User: ${user}`);
      res.json(user);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  Users.remove(req.params.id)
    .then(() => {
      res.json(req.user);
    })
    .catch(next);
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const result = await Users.getUserPosts(req.params.id);
    res.json(result);
  } catch {
    next(err);
  }
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // console.log(req.body);
  // console.log(req.text);
  Posts.insert({ user_id: req.params.id, text: req.text })
    .then((post) => {
      console.log(post);
      res.status(201).json(post);
    })
    .catch(next);
});

// do not forget to export the router
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something bad happened inside the router",
  });
});
module.exports = router;
