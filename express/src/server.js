require('dotenv').config()

var express = require('express');
const app = express()
var vhost = require('vhost')

const path = require('path');

const fs = require('fs');

var privateKey = fs.readFileSync( __dirname + '/ssl/privatekey.pem', 'utf8' );
var certificate = fs.readFileSync( __dirname + '/ssl/certificate.pem', 'utf8' );

var bodyParser = require('body-parser');

const server = require('https').createServer({
  key: privateKey,
  cert: certificate
}, app);

app.use(bodyParser.json());

const {io} = require("./utils/socket");
io.attach(server, {cors: {origin: '*'}});

app.use(vhost('chat.utesu.com', require('./subdomains/chat/router.js').router))
app.use(vhost('api.utesu.com', require('./subdomains/api/chat/v1/router.js').router))

app.use(express.static(path.join(__dirname, '/public/root')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/root', 'index.html'));
});

server.listen(443, () => {
  console.log(`Listening on port 443`)
})

exports.io = io