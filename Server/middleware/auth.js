const jwt = require("jsonwebtoken")


exports.auth=(req,res,next)=>{
    try{
        const token =   req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }
        
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

            req.user=decode;
        }
        catch(error){
            return res.status(402).json({
                success:false,
                message:"token is invalid"
            })
        }

        next();
        }
        
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Error occur in middleware during verification of token"
        })
    }
}