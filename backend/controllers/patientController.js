const Symptom = require("../models/Symptom")

exports.getPatientProfile = async(req,res)=>{
    try {
        const latestSymptom = await Symptom.findOne({ patient: req.user.id }).sort({ createdAt: -1 });
        const riskScore = latestSymptom ? latestSymptom.riskScore : 0;
        const riskLevel = latestSymptom ? latestSymptom.riskLevel : 'low';

        res.json({
            id: req.user.id,
            name: "Patient User", // TODO: get from User model
            riskScore,
            riskLevel
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.submitSymptoms = async(req,res)=>{
    try {
        const { symptoms = [] } = req.body; // symptoms is now array of {name, intensity, duration}

        // Calculate risk score based on individual symptom intensities and durations
        let totalRisk = 0;
        for (const symptom of symptoms) {
            const intensity = Number(symptom.intensity) || 1;
            const duration = symptom.duration;
            let durationFactor = 0;
            if (duration === '1-2 weeks') durationFactor = 1;
            else if (duration === '2-4 weeks') durationFactor = 2;
            else if (duration === 'More than 1 month') durationFactor = 3;

            // Risk contribution per symptom
            totalRisk += intensity * (durationFactor + 1);
        }

        const riskScore = Math.min(100, totalRisk);
        let riskLevel = 'low';
        if (riskScore > 70) riskLevel = 'high';
        else if (riskScore > 40) riskLevel = 'medium';

        // save to DB
        const symptomEntry = await Symptom.create({
            patient: req.user.id,
            symptoms,
            riskScore,
            riskLevel
        });

        res.json({
            success: true,
            riskScore,
            riskLevel,
            entry: symptomEntry
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}