require('dotenv').config()

const express = require("express");
var bodyParser = require('body-parser');
const router = express.Router();
var cors = require('cors')

const path = require('path');

let device = Math.floor(Math.random() * 64)
let counter = 255;

var { Client } = require('pg');

var client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
})

router.use(cors({origin: '*', credentials: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, '../../public/chat')));

router.get('*', async function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/chat', 'index.html'));
});

function getId(type) {
    if (counter == 255) { counter = 0 } else { counter++ }
    return BigInt('0b' + `${pad(parseInt(1).toString(2), 4)}${pad(parseInt(type).toString(2), 4)}${pad(parseInt(device).toString(2), 6)}${pad((counter).toString(2), 8)}${pad((Date.now()).toString(2), 42)}`)
}
  
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.router = router;
 