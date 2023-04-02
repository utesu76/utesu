const express = require("express");
const fileupload = require("express-fileupload");
const router = express.Router();

const channelController = require("../../controllers/channelController")
const userController = require("../../controllers/userController")
const authController = require("../../controllers/authController")
 
router.use(
    fileupload({
        createParentPath: true,
    }),
);

router.use(require('body-parser').urlencoded());

router.use(require('body-parser').json());


// AUTH ROUTES

router.post("/auth/login", authController.login);

router.post("/auth/register", authController.register);

router.get("/auth/logout", authController.logout);

router.use(require('../../../middleware/jwt'))


// USER ROUTES

router.get("/all", userController.all);

router.get("/users/:user/profile", userController.user);

router.get("/users/:user/verify/:type", userController.verify);

router.put("/users/:user/:type", userController.update);


// CHANNEL ROUTES

router.get("/channels", channelController.channels);

router.get("/channels/:channel/messages", channelController.messages);

router.post("/channels/:channel/messages", channelController.create);

router.post("/channels/:channel/attachments", channelController.upload);

router.put("/channels/:channel/heartbeat", channelController.heartbeat);

router.delete("/channels/:channel/leave", channelController.leave);

router.post("/channels/:channel/join", channelController.join);

router.delete("/channels/:channel", channelController.delete);

router.get("/channels/create", channelController.create);

exports.router = router;