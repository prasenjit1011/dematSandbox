const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    authorization   = req.get('Authorization') ?? '';
    token           = authorization.split(' ')[1] ?? '';

    jwt.verify(
            token, 
            'mysecret', 
            (err, result) => { 
                if (err) { 
                    return res.status(400).send({status:false, msg:"Invalid Token"}); 
                } 
                return next(); 
            });
}
