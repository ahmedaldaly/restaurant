const {User} = require('../module/User')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
module.exports.getUser = asyncHandler(async(req,res)=>{
    try{
         const authHeader = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
          }
          const token = authHeader.split(' ')[1];
          const decoded = jwt.verify(token, process.env.SECRET_JWT);
          const check =await User.findById(decoded.id).select('-password')
          console.log(decoded.id)
          if(!check){res.status(404).json({message:'user not found'})}
          res.status(200).json(check)
    }catch(err){res.status(500).json(err)}
})