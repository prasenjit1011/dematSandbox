jwt = require('jsonwebtoken');

exports.getToken = (re, res, next) => {
    let userdata = {username:"Super Admin", role:"admin"};
    token = jwt.sign(userdata, 'mysecret', { expiresIn: '1h' });
    return res.send(token);
}

