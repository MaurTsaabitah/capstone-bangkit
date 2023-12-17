import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.TOKEN, (err, user) => {
            if (err) res.status(403).json({
                message: "Token is not valid"
            });
            req.user = user; 
        });
        next();
    } else {
        return res.status(401).json({message: "you are not authenticated"});
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next()
        } else {
            res.status(403).json({ message: "You are not allowed to do that"});
        }
    });
}


export { verifyToken, verifyTokenAndAuthorization };
