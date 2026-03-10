const router = require("express").Router()
const auth = require("../middleware/authMiddleware")
const roleAuth = require("../middleware/roleAuth")
const doctor = require("../controllers/doctorController")

router.get("/patients",roleAuth(['doctor']),doctor.getPatients)

router.get("/alerts",roleAuth(['doctor']),doctor.getAlerts)

router.post("/recommend-tests",roleAuth(['doctor']),doctor.recommendTests)

router.get("/patient/:patientId/recommendations",roleAuth(['doctor']),doctor.getPatientRecommendations)

router.get("/patient/:patientId/details",auth,doctor.getPatientDetails)

module.exports = router