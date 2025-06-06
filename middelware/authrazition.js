const { User, validateLogin, validateRegister } = require('../module/User');
const jwt = require('jsonwebtoken')
const auth = async(req,res , next)=>{
    try{
        const token = await req.headers.authorization.split(' ')[1];
        if (!token){res.status(404).json({message:'No token provided'})}
        const decoded = await jwt.verify(token,process.env.SECRET_JWT)
        const find = await User.findById(decoded.id)
        
        if (!find) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = find;
        next();
    }catch(err){console.log(err)}
}
const authAndAdmin = async (req,res,next)=>{
    try{
        const token = await req.headers.authorization.split(' ')[1];
        if (!token){res.status(404).json({message:'No token provided'})}
        const decoded = await jwt.verify(token,process.env.SECRET_JWT)
        const find =await User.findById(decoded.id)
        
        if (!find) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(find)
       if(find.isAdmin){
           next(); 
       }else(
        res.status(500).json({message:'only Admin'})
       )
    }catch(err){console.log(err)}
}
module.exports = {
    auth,
    authAndAdmin
}