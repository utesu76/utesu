require('dotenv').config()
const { Socket, io } = require("../utils/socket");
var { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: 'us-east-1', credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } });
const client = require('../utils/db');
const fs = require('fs');

exports.delete = (req, res) => {
  client.query({ text: `DELETE FROM messages WHERE snowflake = $1`, values: [req.params.message] }).then(async (response) => {
    res.status(200).json({ snowflake: req.params.message })
  }).catch((err) => {
    res.status(500).json('Internal Server Error')
  })
}

exports.leave = (req, res) => {
  if (req.params.channel == '1311000000000000000') {
    res.status(405).json('Method Not Allowed')
  } else {
    client.query({ text: `DELETE FROM relations WHERE user_snowflake = $1 AND channel_snowflake = $2`, values: [req.jwt.snowflake, req.params.channel] }).then(async (response) => {
      res.status(200).json('Success')
    }).catch((err) => {
      res.status(500).json('Internal Server Error')
    })
  }  
}

exports.upload = (req, res) => {
  let return_name = `attachments/${getId(5)}/${req.files.file.name}`
  const uploadParams = {
    Bucket: "utesu-files",
    Key: return_name,
    Body: req.files.file.data,
    ACL:'public-read'
  };
  async function run() {
    try {
      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      client.query({ text: `INSERT INTO messages VALUES($1, $2, $3, DEFAULT, $4) RETURNING *`, values: [getId(4), req.params.channel, req.jwt.snowflake, `https://files.utesu.com/${return_name}`] }).then(async (response) => {
        temp = response.rows[0]
        client.query({ text: `SELECT avatar, display_name, snowflake FROM users WHERE snowflake = $1`, values: [response.rows[0].author_snowflake] }).then(async (response) => {
          io.to(req.params.channel).emit('message', { message: temp, users: response.rows[0] })
          res.status(201).json({ message: temp, users: response.rows[0]})
        }).catch((err) => {
          res.status(500).json('Ijnternal Server Error')
        })
      }).catch((err) => {
        res.status(500).json('Internal Server Error')
      })
    } catch (err) {
      res.status(500).json('Internal Server Error')
    }
  };
  run();
};

exports.send = (req, res) => {
  if (req.body.content.length > 355 || req.body.content.length < 1) {
    res.status(400).json('Message either too long or too short')
  } else {
    client.query({ text: `INSERT INTO messages VALUES($1, $2, $3, DEFAULT, $4) RETURNING *`, values: [getId(4), req.params.channel, req.jwt.snowflake, req.body.content] }).then(async (response) => {
      temp = response.rows[0]
      client.query({ text: `SELECT avatar, display_name, snowflake FROM users WHERE snowflake = $1`, values: [response.rows[0].author_snowflake] }).then(async (response) => {
        io.to(req.params.channel).emit('message', { message: temp, users: response.rows[0] })
        res.status(201).json({ message: temp, users: response.rows[0] })
      }).catch((err) => {
        res.status(500).json('Internal Server Error')
      })
    }).catch((err) => {
      res.status(500).json('Internal Server Error')
    })
  }
};

exports.channels = async (req, res) => {
  let users = {}
  let channels = {}
  let user = await client.query({ text: `SELECT * FROM users WHERE snowflake = $1`, values: [req.jwt.snowflake] })
  client.query({ text: `SELECT * FROM relations WHERE user_snowflake = $1 ORDER BY timestamp DESC`, values: [req.jwt.snowflake] }).then(async (response) => {
    if (response.rows.length === 0) {
      res.status(200).json({ user_data: {...user.rows[0], last_channel: 'me'}, users: {}, channels: {} })
    } else {
      last_channel = response.rows[0].channel_snowflake
      for (let i = 0; i < response.rows.length; i++) {
        let channel = await client.query({ text: `SELECT * FROM channels WHERE snowflake = $1`, values: [response.rows[i].channel_snowflake] })
        let owner = await client.query({ text: `SELECT * FROM users WHERE snowflake = $1`, values: [channel.rows[0].owner_snowflake] })
        users = {
          [owner.rows[0].snowflake]: {
            display_name: owner.rows[0].display_name,
            avatar: owner.rows[0].avatar
          }
        }
        let data = await client.query({ text: `SELECT * FROM messages WHERE channel_snowflake = $1 ORDER BY timestamp DESC LIMIT 30`, values: [response.rows[i].channel_snowflake] })
        let members = await client.query({ text: `SELECT COUNT(*) FROM relations WHERE channel_snowflake = $1`, values: [response.rows[i].channel_snowflake] })
        channels = {
          ...channels,
          [response.rows[i].channel_snowflake]: {
            snowflake: channel.rows[0].snowflake,
            display_name: channel.rows[0].display_name,
            avatar: channel.rows[0].avatar,
            owner_snowflake: channel.rows[0].owner_snowflake,
            timestamp: channel.rows[0].timestamp,
            members: members.rows[0].count,
            messages: data.rows
          }
        }
        for (let i = 0; i < data.rows.length; i++) {
          let user = await client.query({ text: `SELECT snowflake, display_name, avatar FROM users WHERE snowflake = $1`, values: [data.rows[i].author_snowflake] })
          if (!users.hasOwnProperty(user.rows[0].snowflake)) {
            users = {
              ...users,
              [user.rows[0].snowflake]: {
                display_name: user.rows[0].display_name,
                avatar: user.rows[0].avatar
              }
            }
          }
        }
      }
      res.status(200).json({ user_data: {...user.rows[0], last_channel: last_channel}, users: users, channels: channels })
    }
  }).catch((err) => {
    res.status(500).json('Internal Server Error')
    console.log(err)
  })
};

exports.channel = async (req, res) => {
  client.query({ text: `SELECT avatar, display_name FROM channels WHERE snowflake = $1`, values: [req.params.channel] }).then(async (response) => {
    res.status(200).json(response.rows[0])
  }).catch((err) => {
    res.status(500).json('Internal Server Error')
  })
};

exports.offset = async (req, res) => {
  let users = {}
  client.query({ text: `SELECT * FROM messages WHERE channel_snowflake = $1 ORDER BY timestamp DESC OFFSET $2 LIMIT 20`, values: [req.params.channel, req.params.offset] }).then(async (response) => {
    for (let i = 0; i < response.rows.length; i++) {
      let user = await client.query({ text: `SELECT snowflake, display_name, avatar FROM users WHERE snowflake = $1`, values: [response.rows[i].author_snowflake] })
      if (!users.hasOwnProperty(user.rows[0].snowflake)) {
        users = {
          ...users,
          [user.rows[0].snowflake]: {
            display_name: user.rows[0].display_name,
            avatar: user.rows[0].avatar
          }
        }
      }
    }
    res.status(200).json({ users: users, messages: response.rows })
  }).catch((err) => {
    res.status(500).json('Internal Server Error')
  })
};

exports.join = (req, res) => {
  client.query({ text: `SELECT * FROM channels WHERE snowflake = $1`, values: [req.params.channel] }).then(async (response) => {
    if (response.rows.length > 0) {
      client.query({ text: `INSERT INTO relations VALUES($1, $2, $3, DEFAULT)`, values: [getId(4), req.jwt.snowflake, response.rows[0].snowflake] }).then(async (response) => {
        res.redirect(`/channels/${req.params.channel}`)
      }).catch((err) => {
        res.status(500).json('Internal Server Error')
      })
    } else {
      res.status(404).json('Channel not found')
    }
  }).catch((err) => {
    res.status(500).json('Internal Server Error')
  })
};

exports.create = (req, res) => {
  let uploadParams = {}
  let return_name = ''

  if (req.files === null) {
    return_name = `avatars/${getId(5)}/default.png`
    uploadParams = {
      Bucket: "utesu-files",
      Key: return_name,
      Body: fs.createReadStream(__dirname + '/../public/default.png'),
      ACL:'public-read'
    };
  } else {
    return_name = `avatars/${getId(5)}/${req.files.file.name}`
    uploadParams = {
      Bucket: "utesu-files",
      Key: return_name,
      Body: req.files.file.data,
      ACL:'public-read'
    };
  }

  async function run() {
    try {
      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      let channel_snowflake = getId(3)
      client.query({ text: `INSERT INTO channels VALUES($1, $2, $4, $3, DEFAULT) RETURNING *`, values: [channel_snowflake, req.body.name, req.jwt.snowflake, `https://files.utesu.com/${return_name}`] }).then(async (response) => {
        let temp = response.rows[0]
        client.query({ text: `INSERT INTO relations VALUES($1, $2, $3, DEFAULT)`, values: [getId(4), 1243000000000000000, channel_snowflake] }).then(async (response) => {
            client.query({ text: `INSERT INTO relations VALUES($1, $2, $3, DEFAULT)`, values: [getId(4), req.jwt.snowflake, channel_snowflake] }).then(async (response) => {
              client.query({ text: `INSERT INTO messages VALUES($1, $2, $3, DEFAULT, $4) RETURNING *`, values: [getId(2), channel_snowflake, 1243000000000000000, 'Channel Created!'] }).then(async (response) => {
                res.status(201).json({ channels: { ...temp, messages: [...response.rows] } })
              }).catch((err) => {
                res.status(500).json('Internal Server Error')
              })
            }).catch((err) => {
              res.status(500).json('Internal Server Error')
            })
        }).catch((err) => {
          res.status(500).json('Internal Server Error')
        })
      }).catch((err) => {
        res.status(500).json('Internal Server Error')
      })
    } catch (err) {
      res.status(500).json('Internal Server Error')
    }
  };
  run();
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

let device = Math.floor(Math.random() * 64)
let counter = 255;