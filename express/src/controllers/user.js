require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../utils/db');

let device = Math.floor(Math.random() * 64)
let counter = 255;

exports.update = async (req, res) => {
  if (req.params.type == 'display_name') {
    client.query({ text: `UPDATE users SET display_name = $1 WHERE snowflake = $2`, values: [req.body.display_name, req.jwt.snowflake] }).then((response) => {
      res.status(201).json({ user_data: { display_name: req.body.display_name } })
    })
  } else if (req.params.type == 'email') {
    client.query({ text: `UPDATE users SET email = $1 WHERE snowflake = $2`, values: [req.body.email, req.jwt.snowflake] }).then((response) => {
      res.status(201).json({ user_data: { display_name: req.body.display_name } })
    })
  } else if (req.params.type == 'password') {
    jwt.verify(req.body.token, process.env.HASH, function (err, decoded) {
      if (err) {
          res.status(403).json('Invalid Verify Token')
      } else {
        if (decoded.type == 'password') {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
              client.query({ text: `UPDATE users SET password = $1 WHERE snowflake = $2`, values: [hash, decoded.snowflake] }).then((response) => {
                  res.status(201).json({ user_data: { display_name: req.body.display_name } })
              })
          })
        } else {
          res.status(403).json('Invalid Verify Token')
        }
      }
    })
  } else {
    res.status(404).json('Not Found');
  }
};

exports.verify = async (req, res) => {
  if (req.params.type == 'password') {
    client.query({ text: `SELECT * FROM users WHERE snowflake = $1`, values: [req.jwt.snowflake] }).then((response) => {
      bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
        if (result) {
            res.status(200).json({ token: jwt.sign({ snowflake: response.rows[0].snowflake, type: 'password' }, process.env.HASH, { expiresIn: '10m' })})
        } else {
            res.status(401).json('Wrong Username Or Password');
        }
      });
    })
  } else if (req.params.type == 'register') { 
    client.query({text: 'SELECT * FROM codes WHERE snowflake = $1', values: [req.jwt.snowflake]}).then(response => {
      if (response.rows.length > 0) {
        if (response.rows[0].code == req.body.code) {
          client.query({text: 'DELETE FROM codes WHERE snowflake = $1', values: [req.jwt.snowflake]}).then(response => {
            client.query({text: 'UPDATE users SET verified = true WHERE snowflake = $1', values: [req.jwt.snowflake]}).then(response => {
              client.query({text: 'SELECT snowflake, username, display_name, avatar, password FROM users WHERE snowflake = $1 LIMIT 1', values: [req.jwt.snowflake]}).then(response => {
                res.status(200).json({ token: jwt.sign({ snowflake: response.rows[0].snowflake }, process.env.HASH, { expiresIn: '1d' }), user_data: { snowflake: response.rows[0].snowflake, display_name: response.rows[0].display_name, avatar: response.rows[0].avatar }})
              })
            })
          })
        } else {
          res.status(403).json('Invalid Code')
        }
      }
    })
  } else {
    res.status(404).json('Not Found');
  }
};

function getId(type) {
  if (counter == 255) { counter = 0 } else { counter++ }
  return BigInt('0b' + `${pad(parseInt(1).toString(2), 4)}${pad(parseInt(type).toString(2), 4)}${pad(parseInt(device).toString(2), 6)}${pad((counter).toString(2), 8)}${pad((Date.now()).toString(2), 42)}`)
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}