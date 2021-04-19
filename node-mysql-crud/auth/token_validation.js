const {verify} = require("jsonwebtoken")

module.exports = {
    checkToken: (req,res,next) =>{
        let token = req.get("authoriziation")

        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "invalid token"
                    })
                }else{
                    next()
                }
            })
        }else{
            res.json({
                success: 0,
                message: "Access Denied ! Unautorized user"
            })
        }
    }
}