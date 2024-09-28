const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).send({ message: 'Token doesn\'t exist' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid Token' });
        }

        req.userId = decoded.userId;
        next();
    });
}

const jwtFuncs = {
    verifyToken: verifyToken
};

module.exports = jwtFuncs;
