require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../utils/db');
const mailgun = require("mailgun-js");

let device = Math.floor(Math.random() * 64)
let counter = 255;

exports.callback = (req, res) => {
    if (req.qury.code !== null) {
        client.query({text: 'SELECT * FROM oauth WHERE token = $1', values: [req.query.code]}).then(response => {
            if (response.rows[0] !== undefined) {
                client.query({text: 'SELECT snowflake, username, display_name, avatar, password FROM users WHERE snowflake = $1 LIMIT 1', values: [response.rows[0].snowflake]}).then(response => {
                    if (response.rows[0] !== undefined) {
                        res.status(200).json({ token: jwt.sign({ snowflake: response.rows[0].snowflake }, process.env.HASH, { expiresIn: '1d' }), user_data: { snowflake: response.rows[0].snowflake, display_name: response.rows[0].display_name, avatar: response.rows[0].avatar }})
                    } else {
                        res.status(400).json('Wrong Username Or Password');
                    }
                })
            } else {
                res.status(400).json('Wrong Code');
            }
        })
    } else {
        res.status(400).json('Missing Code');
    }
};

exports.login = (req, res) => {
    if (req.body.username !== null && req.body.password !== null) {
        client.query({text: 'SELECT snowflake, username, display_name, avatar, password, verified FROM users WHERE username = $1 LIMIT 1', values: [req.body.username]}).then(response => {
            if (response.rows[0] !== undefined) {
                if (response.rows[0].verified == true) {
                    bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
                        if (result) {
                            res.status(200).json({ token: jwt.sign({ snowflake: response.rows[0].snowflake }, process.env.HASH, { expiresIn: '1d' }), user_data: { snowflake: response.rows[0].snowflake, display_name: response.rows[0].display_name, avatar: response.rows[0].avatar }})
                        } else {
                            res.status(400).json('Wrong Username Or Password');
                        }
                    });
                } else {
                    res.status(403).json({token: jwt.sign({ snowflake: response.rows[0].snowflake }, process.env.HASH, { expiresIn: '1d' })});
                }
            } else {
                res.status(400).json('Wrong Username Or Password');
            }
        })
    } else {
        res.status(400).json('Missing ID Or Password');
    }
};

exports.register = (req, res) => {
    if (req.body.username !== null && req.body.password !== null && req.body.email !== null) {
        if (req.body.username.length < 3 || req.body.username.length > 32 || req.body.password.length < 8 || req.body.password.length > 32) {
            res.status(400).json('Username Or Password Is Too Short Or Too Long');
        } else {
            if (validateEmail(req.body.email)) {
                client.query({text: 'SELECT snowflake, username, display_name, avatar, password FROM users WHERE username = $1 LIMIT 1', values: [req.body.username]}).then(response => {
                    if (response.rows[0] == undefined) {
                        bcrypt.hash(req.body.password, 12, function(err, hash) {
                            let temp_user = getId(1)
                            client.query({text: 'INSERT INTO relations VALUES($1, $2, $3, DEFAULT) RETURNING *', values: [getId(4), temp_user, '1311000000000000000']}).then(response => {
                                client.query({text: 'INSERT INTO users(snowflake, username, password, email, display_name) VALUES($1, $2, $3, $4, $2) RETURNING *', values: [temp_user, req.body.username, hash, req.body.email]}).then(response => {
                                    let code = Math.floor(100000 + Math.random() * 900000)
                                    const mg = mailgun({apiKey: '7cdb8fbf8aacb093506ab5ab77a2716f-15b35dee-268501ed', domain: 'noreply.utesu.com'});
                                    const data = {
                                        from: 'Utesu <service@noreply.utesu.com>',
                                        to: `${req.body.username}, ${req.body.email}`,
                                        subject: `Email Confirmation ${code}`,
                                        html: `<div style="padding:30px; margin: 0;"> <p style="color:#777777; font-size:26px; font-weight:400; margin: 0px;">Email Confirmation</p> <p style="color:#777777; font-size:14px; margin: 6px 0 0 0">Please use the code below to finish the registration process.</p> <p style="background-color: #7aaed4; color: white; font-size:36px; padding:6px 12px 6px 28px; letter-spacing:16px; margin-top:15px; display:inline-block;">${code}</p> </div>`
                                    };
                                    client.query({text: 'INSERT INTO codes VALUES($1, $2) RETURNING *', values: [response.rows[0].snowflake, code]}).then(response => {
                                        mg.messages().send(data, function (error, body) {
                                            res.status(200).json({ token: jwt.sign({ snowflake: response.rows[0].snowflake }, process.env.HASH, { expiresIn: '1d' })})
                                        });
                                    })
                                }).catch(err => {
                                    res.status(500).json('Internal Server Error');
                                    console.log(err)
                                })
                            }).catch(err => {
                                res.status(500).json('Internal Server Error');
                                console.log(err)
                            })
                        });
                    } else {
                        res.status(400).json('Account with that username already exists');
                    }
                })
            } else {
                res.status(400).json('Invalid Email');
            }
        }
    } else {
        res.status(400).json('Missing ID Or Password');
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

function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}