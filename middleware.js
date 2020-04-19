const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;


const withAuth = function(req, res, next) {
    const token = req.params.apiKey;
    if (!token.apiKey) {
        res.status(401).send(`Unauthorized: No token provided; ${req.headers}`);
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                console.log(decoded.email)
                req.email = decoded.email;
                next();
            }
        });
    }
}
module.exports = withAuth;