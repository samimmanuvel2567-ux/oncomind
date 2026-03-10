const router = require("express").Router()

const upload = require("../middleware/upload")
const auth = require("../middleware/auth")
const roleAuth = require("../middleware/roleAuth")
const report = require("../controllers/reportController")

router.post(
"/upload",
auth,
upload.single("file"),
report.uploadReport
)

router.get("/doctor-reports", roleAuth(['doctor', 'admin']), report.getDoctorReports)

module.exports = router