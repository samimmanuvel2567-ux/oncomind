const mongoose = require("mongoose")

const predictionSchema = new mongoose.Schema({

 reportId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Report"
 },

 cancerType:String,
 riskScore:Number,

 stage:String,

 createdAt:{
  type:Date,
  default:Date.now
 }

})

module.exports = mongoose.model("Prediction",predictionSchema)