require('dotenv').config();

let con = {
    URL:process.env.url,
    secretkey:process.env.jwtsecret,
    expire_time:process.env.jwt_expire_in,
}

module.exports={con};