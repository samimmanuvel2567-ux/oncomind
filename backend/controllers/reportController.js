const Report = require("../models/Report")

exports.uploadReport = async(req,res)=>{

const report = await Report.create({

patient:req.user.id,

file:req.file.filename

})

res.json({

success:true,

report

})

}

exports.getDoctorReports = async(req,res)=>{

const reports = await Report.find()
.populate("patient","name email")

res.json(reports)

}