const router = require("express").Router()
const auth = require("../middleware/authMiddleware")
const patient = require("../controllers/patientController")

router.get("/profile",auth,patient.getPatientProfile)

router.post("/symptoms",auth,patient.submitSymptoms)

module.exports = router