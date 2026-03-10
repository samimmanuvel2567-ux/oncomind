// Mock Users for different roles
export const mockUsers = [
  {
    id: 1,
    name: 'John Patient',
    email: 'patient@oncomind.com',
    role: 'patient',
    avatar: '👤'
  },
  {
    id: 2,
    name: 'Dr. Sarah Smith',
    email: 'doctor@oncomind.com',
    role: 'doctor',
    avatar: '👩‍⚕️'
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@oncomind.com',
    role: 'admin',
    avatar: '👨‍💼'
  }
];

// Mock Patient Data
export const mockPatients = [
  {
    id: 1,
    name: 'John Patient',
    age: 45,
    gender: 'Male',
    riskScore: 25,
    riskLevel: 'low',
    rpi: 78,
    lastAssessment: '2024-01-15',
    nextReassessment: '2024-03-01',
    reassessmentStatus: 'up-to-date',
    symptoms: [
      { name: 'Fatigue', severity: 2, duration: '2 weeks' },
      { name: 'Cough', severity: 1, duration: '1 week' }
    ],
    reports: [],
    adherence: 85,
    createdAt: '2023-06-01'
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 38,
    gender: 'Female',
    riskScore: 55,
    riskLevel: 'medium',
    rpi: 62,
    lastAssessment: '2024-01-10',
    nextReassessment: '2024-02-24',
    reassessmentStatus: 'due',
    symptoms: [
      { name: 'Unexplained Weight Loss', severity: 3, duration: '1 month' },
      { name: 'Night Sweats', severity: 2, duration: '3 weeks' }
    ],
    reports: [],
    adherence: 70,
    createdAt: '2023-08-15'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    age: 62,
    gender: 'Male',
    riskScore: 78,
    riskLevel: 'high',
    rpi: 45,
    lastAssessment: '2024-01-05',
    nextReassessment: '2024-02-19',
    reassessmentStatus: 'overdue',
    symptoms: [
      { name: 'Persistent Pain', severity: 4, duration: '2 months' },
      { name: 'Lump/Mass', severity: 3, duration: '1 month' },
      { name: 'Difficulty Swallowing', severity: 3, duration: '3 weeks' }
    ],
    reports: [],
    adherence: 55,
    createdAt: '2023-03-10'
  },
  {
    id: 4,
    name: 'Emily Davis',
    age: 35,
    gender: 'Female',
    riskScore: 18,
    riskLevel: 'low',
    rpi: 92,
    lastAssessment: '2024-01-20',
    nextReassessment: '2024-03-05',
    reassessmentStatus: 'up-to-date',
    symptoms: [],
    reports: [],
    adherence: 95,
    createdAt: '2023-11-01'
  }
];

// Mock Doctor Data
export const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Smith',
    specialization: 'Oncology',
    patients: [1, 2, 3, 4],
    alerts: 2
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'General Medicine',
    patients: [1, 2],
    alerts: 0
  }
];

// Mock Admin Stats
export const mockAdminStats = {
  totalPatients: 1250,
  totalDoctors: 45,
  totalAdmins: 8,
  averageRiskScore: 32,
  complianceRate: 78,
  activeUsers: 890,
  monthlyNewPatients: 85,
  riskDistribution: [
    { name: 'Low Risk', value: 65, color: '#228B22' },
    { name: 'Medium Risk', value: 25, color: '#FFD700' },
    { name: 'High Risk', value: 10, color: '#DC3545' }
  ],
  monthlyTrends: [
    { month: 'Aug', patients: 65, riskScore: 35 },
    { month: 'Sep', patients: 72, riskScore: 33 },
    { month: 'Oct', patients: 78, riskScore: 31 },
    { month: 'Nov', patients: 82, riskScore: 30 },
    { month: 'Dec', patients: 85, riskScore: 32 },
    { month: 'Jan', patients: 90, riskScore: 32 }
  ],
  regionalData: [
    { region: 'North', patients: 320, riskScore: 28 },
    { region: 'South', patients: 280, riskScore: 35 },
    { region: 'East', patients: 350, riskScore: 30 },
    { region: 'West', patients: 300, riskScore: 33 }
  ]
};

// Risk Score Calculation Factors
export const riskFactors = [
  { name: 'Symptoms', weight: 40, description: 'Current symptom severity and duration' },
  { name: 'Medical History', weight: 30, description: 'Family history and previous conditions' },
  { name: 'Lifestyle', weight: 20, description: 'Smoking, alcohol, diet factors' },
  { name: 'Age', weight: 10, description: 'Age-related risk factors' }
];

// Available Tests for Doctor Recommendation
export const availableTests = [
  { id: 'cbc', name: 'Complete Blood Count (CBC)', description: 'Checks blood cell counts' },
  { id: 'tumor_marker', name: 'Tumor Marker Test', description: 'Detects cancer biomarkers' },
  { id: 'ct_scan', name: 'CT Scan', description: 'Cross-sectional imaging' },
  { id: 'mri', name: 'MRI Scan', description: 'Detailed soft tissue imaging' },
  { id: 'biopsy', name: 'Biopsy Report', description: 'Tissue sample analysis' },
  { id: 'histopathology', name: 'Histopathology Report', description: 'Cellular pathology analysis' },
  { id: 'xray', name: 'X-Ray', description: 'Basic imaging' },
  { id: 'ultrasound', name: 'Ultrasound', description: 'Sound wave imaging' }
];

// Mock Structured Report Data
export const mockStructuredReport = {
  patientId: 1,
  reportDate: '2024-01-15',
  extractedData: {
    cancerType: 'Lung Cancer',
    tumorSize: '3.4 cm',
    tumorGrade: 'Grade II',
    lymphNodeInvolvement: 'Present',
    metastasis: 'Not Detected',
    tumorMarkerLevel: 'Elevated',
    clinicalStage: 'Stage II'
  },
  summary: 'The report indicates Stage II Lung Cancer with moderate tumor size. Lymph node involvement detected. No metastasis observed.',
  recommendations: ['Further imaging recommended', 'Oncology consultation', 'Treatment planning'],
  aiInsights: 'Based on the structured data, the risk assessment aligns with moderate complexity. Early intervention recommended.'
};

// Symptom Categories
export const symptomCategories = [
  {
    category: 'General Symptoms',
    symptoms: [
      { id: 'fatigue', name: 'Fatigue', icon: '😴' },
      { id: 'weight_loss', name: 'Unexplained Weight Loss', icon: '⚖️' },
      { id: 'fever', name: 'Fever', icon: '🌡️' },
      { id: 'night_sweats', name: 'Night Sweats', icon: '💦' }
    ]
  },
  {
    category: 'Pain Symptoms',
    symptoms: [
      { id: 'persistent_pain', name: 'Persistent Pain', icon: '🤕' },
      { id: 'headache', name: 'Headache', icon: '🤯' },
      { id: 'bone_pain', name: 'Bone Pain', icon: '🦴' }
    ]
  },
  {
    category: 'Respiratory Symptoms',
    symptoms: [
      { id: 'cough', name: 'Cough', icon: '😷' },
      { id: 'shortness_breath', name: 'Shortness of Breath', icon: '😮‍💨' },
      { id: 'coughing_blood', name: 'Coughing Blood', icon: '🩸' }
    ]
  },
  {
    category: 'Digestive Symptoms',
    symptoms: [
      { id: 'difficulty_swallow', name: 'Difficulty Swallowing', icon: '🍽️' },
      { id: 'change_bowel', name: 'Change in Bowel Habits', icon: '🚽' },
      { id: 'blood_stool', name: 'Blood in Stool', icon: '🟤' }
    ]
  },
  {
    category: 'Skin Symptoms',
    symptoms: [
      { id: 'lump_mass', name: 'Lump/Mass', icon: '🔴' },
      { id: 'skin_change', name: 'Skin Changes', icon: '🎨' },
      { id: 'wound_not_heal', name: 'Wound Not Healing', icon: '🩹' }
    ]
  }
];

// Skin Analysis Mock Results
export const mockSkinAnalysis = {
  uploadedAt: '2024-01-15T10:30:00Z',
  imageUrl: '/skin-upload-placeholder.jpg',
  analysis: {
    asymmetry: 'Moderate',
    border: 'Irregular',
    color: 'Uneven',
    diameter: '6mm',
    evolution: 'Changing'
  },
  riskAssessment: 'medium',
  recommendations: [
    'Monitor closely for changes',
    'Apply SPF 30+ sunscreen daily',
    'Schedule dermatologist appointment',
    'Take photos monthly for comparison'
  ],
  confidence: 78
};

// Chatbot Mock Responses
export const chatbotResponses = {
  greeting: "Hello! I'm OncoMind Assistant. How can I help you today?",
  default: "I understand your concern. For specific medical advice, please consult your doctor. Would you like me to explain your risk score or help you navigate the platform?",
  risk_explanation: "Your Cancer Risk Score (CRS) is calculated based on multiple factors including symptoms (40%), medical history (30%), lifestyle factors (20%), and age (10%). A score below 30 is considered low risk, 30-70 is medium, and above 70 is high risk.",
  symptoms_explanation: "Tracking your symptoms helps us identify patterns and changes that may indicate potential health concerns. Please be honest and thorough when reporting symptoms.",
  report_explanation: "After uploading your medical reports, our AI will structure the data and provide insights. Your doctor will be able to see full details, while you'll see a summary with important information.",
  disclaimer: "I must remind you that this is a prototype and does not provide medical diagnoses. Always consult with a licensed healthcare provider for medical advice."
};

