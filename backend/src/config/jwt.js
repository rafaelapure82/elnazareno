require('dotenv').config();

module.exports = {
    jwtAccessSecret: process.env.ACCESS_TOKEN_SECRET,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '24h',
    jwrRefreshSecret: process.env.REFRESH_TOKEN_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
};