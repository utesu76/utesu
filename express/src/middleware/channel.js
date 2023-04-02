const client = require('../utils/db');

exports.check = (req, res, next) => {
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

