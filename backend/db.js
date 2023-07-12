const mongoose = require('mongoose');
const mongooseURI = "mongodb://127.0.0.1:27017"

const connectToMongo = () =>
{
    mongoose.connect(mongooseURI).then(()=>{
        console.log("Connection successfull")
    }).catch((err)=>{
        console.log("Connection not successfull")
    })
}
module.exports = connectToMongo;
