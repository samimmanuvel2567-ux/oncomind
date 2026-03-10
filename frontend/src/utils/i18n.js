import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      appName: 'OncoMind',
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      submit: 'Submit',
      back: 'Back',
      next: 'Next',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      
      // Auth
      login: 'Login',
      logout: 'Logout',
      selectRole: 'Select Your Role',
      patient: 'Patient',
      doctor: 'Doctor',
      admin: 'Admin',
      welcome: 'Welcome',
      
      // Navigation
      home: 'Home',
      dashboard: 'Dashboard',
      symptoms: 'Symptoms',
      skinCheck: 'Skin Check',
      reports: 'Reports',
      patients: 'Patients',
      alerts: 'Alerts',
      analytics: 'Analytics',
      stats: 'Statistics',
      users: 'Users',
      monitoring: 'Monitoring',
      
      // Risk Assessment
      riskScore: 'Risk Score',
      riskLevel: 'Risk Level',
      lowRisk: 'Low Risk',
      mediumRisk: 'Medium Risk',
      highRisk: 'High Risk',
      rpi: 'Recovery Progress Index',
      
      // Reassessment
      reassessment: 'Reassessment',
      lastAssessment: 'Last Assessment',
      nextReassessment: 'Next Reassessment',
      upToDate: 'Up to Date',
      due: 'Due',
      overdue: 'Overdue',
      daysRemaining: 'days remaining',
      daysOverdue: 'days overdue',
      
      // Reports
      uploadReport: 'Upload Report',
      structuredReport: 'Structured Report',
      extracting: 'Structuring Diagnostic Report Data...',
      viewFullReport: 'View Full Report',
      viewSummary: 'View Summary',
      
      // Doctor Workflow
      recommendTests: 'Recommend Tests',
      assignTests: 'Assign Tests',
      patientAlerts: 'Patient Alerts',
      redZoneAlert: 'Red Zone Alert',
      
      // Disclaimer
      disclaimer: 'This is NOT medical advice or diagnosis. Consult a licensed physician. Prototype only—uses synthetic data.',
      disclaimerTitle: 'Medical Disclaimer',
      
      // Symptoms
      selectSymptoms: 'Select your symptoms',
      severity: 'Severity',
      duration: 'Duration',
      addSymptom: 'Add Symptom',
      
      // Skin Analysis
      uploadImage: 'Upload Image',
      analyze: 'Analyze',
      analysisResults: 'Analysis Results',
      recommendations: 'Recommendations',
      
      // Admin
      totalPatients: 'Total Patients',
      totalDoctors: 'Total Doctors',
      complianceRate: 'Compliance Rate',
      riskDistribution: 'Risk Distribution',
      
      // Chatbot
      chatbot: 'Assistant',
      typeMessage: 'Type your message...',
      askQuestion: 'Ask a question',
      
      // Errors
      errorOccurred: 'An error occurred',
      tryAgain: 'Try Again',
      noData: 'No data available',
      
      // Success
      success: 'Success',
      saved: 'Saved successfully',
      uploaded: 'Uploaded successfully'
    }
  },
  ta: {
    translation: {
      // Common
      appName: 'ஆன்கோமைண்ட்',
      loading: 'ஏற்றுகிறது...',
      save: 'சேமி',
      cancel: 'ரத்து',
      submit: 'சமர்ப்பி',
      back: 'மீள்',
      next: 'அடுத்து',
      view: 'பார்',
      edit: 'திருத்து',
      delete: 'நீக்கு',
      search: 'தேடு',
      filter: 'வடிகட்டு',
      export: 'ஏற்று',
      
      // Auth
      login: 'உள்நுழை',
      logout: 'வெளியேறு',
      selectRole: 'உங்கள் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்',
      patient: 'நோயாளி',
      doctor: 'மருத்துவர்',
      admin: 'நிர்வாகி',
      welcome: 'வரவேற்கிறோம்',
      
      // Navigation
      home: 'முகப்பு',
      dashboard: 'டாஷ்போர்டு',
      symptoms: 'அறிகுறிகள்',
      skinCheck: 'தோல் பரிசோதனை',
      reports: 'அறிக்கைகள்',
      patients: 'நோயாளிகள்',
      alerts: 'விழிப்பூட்டல்கள்',
      analytics: 'பகுப்பாய்வு',
      stats: 'புள்ளிவிவரங்கள்',
      users: 'பயனர்கள்',
      monitoring: 'கண்காணிப்பு',
      
      // Risk Assessment
      riskScore: 'ஆபத்து மதிப்பெண்',
      riskLevel: 'ஆபத்து நிலை',
      lowRisk: 'குறைந்த ஆபத்து',
      mediumRisk: 'நடுத்தர ஆபத்து',
      highRisk: 'உயர் ஆபத்து',
      rpi: 'மீட்பு прогресс индекс',
      
      // Reassessment
      reassessment: 'மதிப்பீடு',
      lastAssessment: 'கடைசி மதிப்பீடு',
      nextReassessment: 'அடுத்த மதிப்பீடு',
      upToDate: 'நாளோடு',
      due: 'வரவேண்டும்',
      overdue: 'தாமதம்',
      daysRemaining: 'நாட்கள் மீதம்',
      daysOverdue: 'நாட்கள் தாமதம்',
      
      // Reports
      uploadReport: 'அறிக்கை ஏற்று',
      structuredReport: 'கட்டமைக்கப்பட்ட அறிக்கை',
      extracting: 'ரிப்போर्ट் டேட்டாவை கட்டமைக்கிறோம்...',
      viewFullReport: 'முழு அறிக்கை',
      viewSummary: 'சுருக்கம்',
      
      // Doctor Workflow
      recommendTests: 'சோதனைகள் பரிந்துரை',
      assignTests: 'சோதனைகள் ஒதுக்க',
      patientAlerts: 'நோயாளி விழிப்பூட்டல்',
      redZoneAlert: 'சிவப்பு மண்டல எச்சரிக்கை',
      
      // Disclaimer
      disclaimer: 'இது மருத்துவ ஆலோசனை அல்ல. அதிகாரப்பூர்வ மருத்துவரை அணுகவும்.',
      disclaimerTitle: 'மருத்துவ எச்சரிக்கை',
      
      // Symptoms
      selectSymptoms: 'உங்கள் அறிகுறிகளைத் தேர்ந்தெடுக்கவும்',
      severity: 'தீவிரம்',
      duration: 'காலம்',
      addSymptom: 'அறிகுறி சேர்',
      
      // Skin Analysis
      uploadImage: 'படம் ஏற்று',
      analyze: 'பகுப்பாய்',
      analysisResults: 'பகுப்பாய்வு முடிவுகள்',
      recommendations: 'பரிந்துரைகள்',
      
      // Admin
      totalPatients: 'மொத்த நோயாளிகள்',
      totalDoctors: 'மொத்த மருத்துவர்கள்',
      complianceRate: 'இணக்கம் வீதம்',
      riskDistribution: 'ஆபத்து பகிர்வு',
      
      // Chatbot
      chatbot: 'உதவியாளர்',
      typeMessage: 'செய்தி அடி...',
      askQuestion: 'கேள்வி கேட்க',
      
      // Errors
      errorOccurred: 'பிழை ஏற்பட்டது',
      tryAgain: 'மீண்டும் முயற்சி',
      noData: 'தரவு இல்லை',
      
      // Success
      success: 'வெற்றி',
      saved: 'வெற்றியாக சேமித்தது',
      uploaded: 'வெற்றியாக ஏற்றது'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

