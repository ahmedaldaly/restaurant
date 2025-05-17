const mongoose =require('mongoose')
if (!process.env.CONNECT_DB) {
  console.error('Error: Missing required MongoDB environment variables.');
  process.exit(1);
}
const ConnectDB =async()=>{
    try{
        mongoose.connect(process.env.CONNECT_DB)
        console.log('db is connected')
    }
    catch(err){console.log(err)}
}
module.exports = ConnectDB