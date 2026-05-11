
import  PatientHeader  from './PatientHeader';
import  PersonalInfoCard  from './PersonalInfoCard';
import  MedicalInfoCard  from './MedicalInfoCard';
import  VisitHistoryCard  from './VisitHistoryCard';
import './Paticentprofile.css';

export default function Paticentprofile() {
  return (
    <div className="app-container">
      <div className="app-content">
        {/* Patient Header Card */}
        <PatientHeader />

        {/* Two Column Grid */}
        <div className="two-column-grid">
          <PersonalInfoCard />
          <MedicalInfoCard />
        </div>

        {/* Visit History Table */}
        <VisitHistoryCard />
      </div>
    </div>
  );
}
