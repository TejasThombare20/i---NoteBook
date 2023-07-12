const jwt = require("jsonwebtoken");
const JWT_SECRET = "line is to get the token";
// It is  intended to hold the secret key used for signing and verifying JWTs.

const fetchUser = (req,res,next) =>
{
    
    const token = req.header("authtoken");
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token1"})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token2"})
    }

}
module.exports = fetchUser;