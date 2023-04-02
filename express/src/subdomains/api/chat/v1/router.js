const express = require("express");
var bodyParser = require('body-parser');
const router = express.Router();
var cors = require('cors');
const fileupload = require("express-fileupload");
const client = require('../../../../utils/db');

const channelController = require("../../../../controllers/channel")
const userController = require("../../../../controllers/user")
const authController = require("../../../../controllers/auth")

const inChannel = (req, res, next) => {
    client.query({ text: `SELECT * FROM relations WHERE user_snowflake = $1 AND channel_snowflake = $2`, values: [req.jwt.snowflake, req.params.channel] }).then(async (response) => {
        if (response.rows.length > 0) {
            next()
        } else {
            res.status(403).json('Forbidden')
        }
    }).catch((err) => {
        res.status(500).json('Internal Server Error')
    })
};

router.use(cors({origin: '*', credentials: true}));
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
router.use(
    fileupload({
        createParentPath: true,
    }),
);


// NEW ROUTES

router.post("/auth/login", authController.login);

router.post("/auth/register", authController.register);

router.use(require('../../../../middleware/jwt'))


// NEW ROUTES

// router.get("/users/:user/profile", userController.user);

router.post("/users/verify/:type", userController.verify);

router.put("/users/update/:type", userController.update);

router.get("/channels", channelController.channels);

router.get("/channels/:channel", channelController.channel);

router.get("/channels/:channel/messages/:offset", inChannel, channelController.offset);

router.post("/channels/:channel/join", channelController.join);

router.post("/channels/create", channelController.create);

router.delete("/channels/:channel/messages/:message", channelController.delete)

// router.get("/channels/:channel/messages", channelController.messages);

router.post("/channels/:channel/messages", inChannel, channelController.send);

router.post("/channels/:channel/attachments", inChannel, channelController.upload);

// router.put("/channels/:channel/heartbeat", channelController.heartbeat);

router.delete("/channels/:channel/leave", inChannel, channelController.leave);

// router.delete("/channels/:channel", channelController.delete);

router.all("*", (req, res) => { res.status(404).json("Not Found") });

exports.router = router;