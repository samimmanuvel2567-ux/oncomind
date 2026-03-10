# OncoMind Frontend - Implementation Plan

## Project Overview
- **Project Name**: OncoMind - AI-Assisted Cancer Care Decision Support
- **Type**: React-based Healthcare Web Application
- **Core Functionality**: Cancer risk assessment, symptom monitoring, report analysis, and doctor-patient workflows
- **Target Users**: Patients, Doctors, Hospital Administrators

## UI/UX Specification

### Color Palette (Deep Blood-Red Theme)
- **Primary Red**: #B22222 (accents, buttons)
- **Dark Red**: #8B0000 (headers, alerts)
- **Background Tint**: #FFF5F5 (soft red-tint backgrounds)
- **Success Green**: #228B22 (positive progress, low risk)
- **Warning Yellow**: #FFD700 (medium risk, warnings)
- **Danger Red**: #DC3545 (high risk, alerts)
- **Neutral Gray**: #696969 (text, borders)

### Typography
- **Primary Font**: Inter, system-ui, sans-serif
- **Headings**: Bold, #8B0000 for main headers
- **Body**: Regular, #333333

### Layout Structure
- **Navigation**: Top navbar with role-specific links
- **Sidebar**: Sub-menus for detailed navigation
- **Content Area**: Card-based layout with proper spacing
- **Responsive**: Mobile-first, tablet/desktop support

### Components
1. **RiskGauge**: Interactive radial gauge with traffic lights
2. **ProgressBar**: Animated progress for RPI
3. **ImageUploader**: Drag-drop for skin analysis
4. **ReportUploader**: File upload with loading states
5. **StructuredReport**: Conditional view (full/summary)
6. **Chatbot**: LLM-powered assistant
7. **HeatmapCalendar**: Adherence tracking
8. **Disclaimer**: Global medical disclaimer

## Functionality Specification

### Authentication & Roles
- Login page with role selection (Patient/Doctor/Admin)
- JWT token storage in localStorage
- Protected routes based on roles
- Automatic redirect for unauthorized access

### Patient Features
1. **Home**: Welcome, quick stats, alerts
2. **Symptoms**: Checkboxes + sliders for symptom entry
3. **Skin Check**: Image upload + AI analysis simulation
4. **Reports**: Upload test reports, view structured output
5. **Dashboard**: Risk score gauge, RPI, trends, reassessment status

### Doctor Features
1. **Patients**: List of assigned patients with risk indicators
2. **Alerts**: Red zone patients requiring attention
3. **Patient Detail**: Full patient profile, recommend tests
4. **Analytics**: Trend charts, LLM summaries

### Admin Features
1. **Stats**: Population metrics, compliance rates
2. **Users**: User management (aggregated data)
3. **Monitoring**: Regional heatmaps, system health

### New Features Implemented
1. **Red Zone Doctor Workflow**: Alert → Recommend Tests → Assign
2. **Report Upload Page**: Upload → Loading → Structured Output
3. **Structured Report**: Full view (Doctor/Admin) vs Summary (Patient)
4. **45-Day Reassessment**: Status tracking, reminders

## Technical Stack
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Axios for API calls
- Recharts for visualizations
- Framer Motion for animations
- Lucide React for icons
- i18next for i18n (English/Tamil)
- Formik + Yup for forms

## File Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Spinner.jsx
│   ├── RiskGauge.jsx
│   ├── ProgressBar.jsx
│   ├── Disclaimer.jsx
│   ├── Chatbot.jsx
│   ├── ReportUploader.jsx
│   ├── StructuredReport.jsx
│   ├── ReassessmentStatus.jsx
│   └── Navbar.jsx
├── pages/
│   ├── Login.jsx
│   ├── patient/
│   │   ├── PatientHome.jsx
│   │   ├── PatientSymptoms.jsx
│   │   ├── PatientSkinCheck.jsx
│   │   ├── PatientReports.jsx
│   │   └── PatientDashboard.jsx
│   ├── doctor/
│   │   ├── DoctorPatients.jsx
│   │   ├── DoctorAlerts.jsx
│   │   └── DoctorPatientDetail.jsx
│   └── admin/
│       ├── AdminStats.jsx
│       ├── AdminUsers.jsx
│       └── AdminMonitoring.jsx
├── contexts/
│   └── AuthContext.jsx
├── services/
│   └── api.js
├── utils/
│   ├── mockData.js
│   └── i18n.js
├── App.jsx
├── main.jsx
└── index.css
```

## Implementation Steps

### Phase 1: Foundation
1. Initialize Vite React project
2. Install dependencies
3. Configure Tailwind CSS
4. Set up project structure

### Phase 2: Core Components
5. Create UI components (Button, Card, Input, etc.)
6. Build AuthContext and protected routes
7. Implement Login page

### Phase 3: Patient Interface
8. Patient pages (Home, Symptoms, Skin Check, Reports, Dashboard)
9. RiskGauge and ProgressBar components
10. ReportUploader and StructuredReport

### Phase 4: Doctor Interface
11. Doctor pages, Alerts, Patient Detail)
12. (Patients Red zone workflow implementation
13. Test recommendation system

### Phase 5: Admin Interface
14. Admin pages (Stats, Users, Monitoring)
15. Compliance tracking

### Phase 6: Polish
16. Animations with Framer Motion
17. Chatbot integration
18. Multilingual support
19. Final styling and testing

## Acceptance Criteria
1. All three role-based interfaces are functional
2. Risk gauge displays with traffic light system
3. Report upload shows loading and structured output
4. 45-day reassessment displays correctly
5. Deep red theme applied consistently
6. All pages have medical disclaimer
7. Protected routes work correctly
8. Mock data displays properly

