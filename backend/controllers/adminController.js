const User = require("../models/User")
const Symptom = require("../models/Symptom")
const Report = require("../models/Report")

exports.getStats = async(req,res)=>{
    try {
        const totalUsers = await User.countDocuments();
        const patients = await User.countDocuments({ role: 'patient' });
        const doctors = await User.countDocuments({ role: 'doctor' });
        const admins = await User.countDocuments({ role: 'admin' });

        // High risk patients
        const highRiskSymptoms = await Symptom.find({ riskLevel: 'high' });
        const highRisk = new Set(highRiskSymptoms.map(s => s.patient.toString())).size;

        // Total reports
        const totalReports = await Report.countDocuments();

        res.json({
            totalUsers,
            patients,
            doctors,
            admins,
            highRisk,
            totalReports
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getUsers = async(req,res)=>{
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.updateUser = async(req,res)=>{
    try {
        const { id } = req.params;
        const updates = req.body;
        delete updates.password; // don't allow password update here
        const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteUser = async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ success: true, message: "User deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getPatientDetails = async(req,res)=>{
    try {
        const { patientId } = req.params;
        const patient = await User.findById(patientId).select('name email');
        if (!patient || patient.role !== 'patient') {
            return res.status(404).json({ message: "Patient not found" });
        }

        const symptoms = await Symptom.find({ patient: patientId }).sort({ createdAt: -1 });
        const reports = await Report.find({ patient: patientId }).sort({ createdAt: -1 });
        const recommendations = await TestRecommendation.find({ patient: patientId }).populate('doctor', 'name').sort({ createdAt: -1 });

        // Only return if patient has data
        if (symptoms.length === 0 && reports.length === 0) {
            return res.status(404).json({ message: "No patient data found" });
        }

        res.json({
            patient: {
                id: patient._id,
                name: patient.name,
                email: patient.email
            },
            symptoms,
            reports,
            recommendations,
            summary: {
                totalSymptoms: symptoms.length,
                totalReports: reports.length,
                currentRiskLevel: symptoms.length > 0 ? symptoms[0].riskLevel : 'low',
                currentRiskScore: symptoms.length > 0 ? symptoms[0].riskScore : 0,
                lastSymptomUpdate: symptoms.length > 0 ? symptoms[0].createdAt : null,
                lastReportUpload: reports.length > 0 ? reports[0].createdAt : null
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getAllPatientsDetails = async(req,res)=>{
    try {
        // Get patients who have either symptoms or reports
        const patientsWithSymptoms = await Symptom.distinct('patient');
        const patientsWithReports = await Report.distinct('patient');
        const patientIds = [...new Set([...patientsWithSymptoms, ...patientsWithReports])];

        const patients = await User.find({ 
            _id: { $in: patientIds },
            role: 'patient' 
        }).select('name email');

        const patientsDetails = await Promise.all(patients.map(async (patient) => {
            const latestSymptom = await Symptom.findOne({ patient: patient._id }).sort({ createdAt: -1 });
            const reportCount = await Report.countDocuments({ patient: patient._id });
            const symptomCount = await Symptom.countDocuments({ patient: patient._id });
            return {
                id: patient._id,
                name: patient.name,
                email: patient.email,
                riskScore: latestSymptom ? latestSymptom.riskScore : 0,
                riskLevel: latestSymptom ? latestSymptom.riskLevel : 'low',
                reportCount,
                symptomCount,
                lastActivity: latestSymptom ? latestSymptom.createdAt : null
            };
        }));
        res.json(patientsDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}