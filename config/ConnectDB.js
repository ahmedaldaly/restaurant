const mongoose =require('mongoose')
const ConnectDB =async()=>{
    try{
        mongoose.connect(process.env.CONNECT_DB)
        console.log('db is connected')
    }
    catch(err){console.log(err)}
}
module.exports = ConnectDB