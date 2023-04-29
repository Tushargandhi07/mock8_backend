const jwt= require('jsonwebtoken');

const authenticate= async(req,res,next)=>{
    let token= req.headers.authorization;
    if(!token){
        res.status(401).send({"msg":"token is required"});
    }
    try {
        const decode= jwt.verify(token,"tushar");
        req.user = decode.id;
        next();
    } catch (error) {
        res.status(401).send({"msg":"token invalid"});
    }
}

module.exports={
    authenticate
}