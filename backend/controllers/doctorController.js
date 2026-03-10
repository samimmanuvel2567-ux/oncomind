const User = require("../models/User")
const Symptom = require("../models/Symptom")
const TestRecommendation = require("../models/TestRecommendation")

exports.getPatients = async(req,res)=>{
    try {
        // Get patients who have either symptoms or reports
        const patientsWithSymptoms = await Symptom.distinct('patient');
        const patientsWithReports = await Report.distinct('patient');
        const patientIds = [...new Set([...patientsWithSymptoms, ...patientsWithReports])];

        const patients = await User.find({ 
            _id: { $in: patientIds },
            role: 'patient' 
        }).select('name email');

        const patientsWithRisk = await Promise.all(patients.map(async (patient) => {
            const latestSymptom = await Symptom.findOne({ patient: patient._id }).sort({ createdAt: -1 });
            const reportCount = await Report.countDocuments({ patient: patient._id });
            return {
                id: patient._id,
                name: patient.name,
                email: patient.email,
                riskLevel: latestSymptom ? latestSymptom.riskLevel : 'low',
                riskScore: latestSymptom ? latestSymptom.riskScore : 0,
                reportCount,
                lastSymptomDate: latestSymptom ? latestSymptom.createdAt : null
            };
        }));
        res.json(patientsWithRisk);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getAlerts = async(req,res)=>{
    try {
        // Get patients who have symptoms and are high risk
        const highRiskSymptoms = await Symptom.find({ riskLevel: 'high' }).populate('patient', 'name email');
        const alerts = highRiskSymptoms.map(symptom => ({
            id: symptom.patient._id,
            name: symptom.patient.name,
            email: symptom.patient.email,
            riskLevel: symptom.riskLevel,
            riskScore: symptom.riskScore,
            symptoms: symptom.symptoms,
            lastUpdated: symptom.createdAt
        }));
        res.json(alerts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.recommendTests = async(req,res)=>{
    try {
        const { patientId, tests, notes } = req.body;
        const recommendation = await TestRecommendation.create({
            patient: patientId,
            doctor: req.user.id,
            tests,
            notes
        });
        res.json({ success: true, recommendation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getPatientRecommendations = async(req,res)=>{
    try {
        const { patientId } = req.params;
        const recommendations = await TestRecommendation.find({ patient: patientId }).populate('doctor', 'name');
        res.json(recommendations);
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