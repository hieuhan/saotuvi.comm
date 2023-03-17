require('dotenv').config();

module.exports = {
    SALT_FACTOR: parseInt(process.env.SALT_FACTOR),
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}