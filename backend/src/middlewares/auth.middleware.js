const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const authUser = async (req, res, next) =>{
    
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access."
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(
            decoded.id
        )

        req.user = user;
        next();
    }
    catch(err){
        res.status(401).json({
            message:`error : ${err}`
        })
    }

}

module.exports = {
    authUser
}
