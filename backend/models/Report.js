const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({

patient:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

file:String,

status:{
type:String,
default:"pending"
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Report",reportSchema)