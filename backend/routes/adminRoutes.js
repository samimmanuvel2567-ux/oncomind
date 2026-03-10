const router = require("express").Router()
const auth = require("../middleware/authMiddleware")
const roleAuth = require("../middleware/roleAuth")
const admin = require("../controllers/adminController")

router.get("/stats",roleAuth(['admin']),admin.getStats)

router.get("/users",roleAuth(['admin']),admin.getUsers)

router.put("/users/:id",roleAuth(['admin']),admin.updateUser)

router.delete("/users/:id",roleAuth(['admin']),admin.deleteUser)

router.get("/patient/:patientId/details",auth,admin.getPatientDetails)

router.get("/patients/details",auth,admin.getAllPatientsDetails)

module.exports = router