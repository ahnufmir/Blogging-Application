const { secureHeapUsed } = require('crypto');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function createTokenForUser(user){
    const payload = {
        _id : user.id,
        name : user.name,
        email : user.email,
        profilePicUrl : user.profilePicUrl,
        role : user.role
    }
    const token = jwt.sign(payload, SECRET);
    return token; 
}

function validateToken(token){
    const payload = jwt.verify(token, SECRET);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}