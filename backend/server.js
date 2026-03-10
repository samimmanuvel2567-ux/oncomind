const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const patientRoutes = require("./routes/patientRoutes")
const doctorRoutes = require("./routes/doctorRoutes")
const adminRoutes = require("./routes/adminRoutes")
const reportRoutes = require("./routes/reportRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("uploads"))

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))

app.use("/api/auth",authRoutes)
app.use("/api/patient",patientRoutes)
app.use("/api/doctor",doctorRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/report",reportRoutes)

app.listen(5000,()=>console.log("Server running on port 5000"))