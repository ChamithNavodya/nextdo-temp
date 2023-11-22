const userController = require("../controller/userController");
const auth = require("../middleware/auth");

const router = require("express").Router();

// Register User
router.post("/register", userController.registerUser);

// Login User
router.post("/login", userController.loginUser);

// Get User
router.get("/user",auth, userController.getUser);

// Verify User
// router.get("/verify", userController.verifiedToken);

module.exports = router;
