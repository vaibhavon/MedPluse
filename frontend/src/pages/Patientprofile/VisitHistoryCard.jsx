    import './VisitHistoryCard.css';

const visits = [
  {
    id: '1',
    date: 'Feb 20, 2026',
    doctor: 'Dr. Anjali Sharma',
    reason: 'Regular Checkup',
    status: 'Completed'
  },
  {
    id: '2',
    date: 'Feb 15, 2026',
    doctor: 'Dr. Vikram Patel',
    reason: 'Fever & Cold',
    status: 'Completed'
  },
  {
    id: '3',
    date: 'Feb 05, 2026',
    doctor: 'Dr. Priya Desai',
    reason: 'Blood Test',
    status: 'Completed'
  },
  {
    id: '4',
    date: 'Mar 05, 2026',
    doctor: 'Dr. Anjali Sharma',
    reason: 'Follow-up Consultation',
    status: 'Scheduled'
  }
];

function getStatusClassName(status) {
  switch (status) {
    case 'Completed':
      return 'visit-status-completed';
    case 'Scheduled':
      return 'visit-status-scheduled';
    case 'Cancelled':
      return 'visit-status-cancelled';
    default:
      return '';
  }
}

export default function VisitHistoryCard() {
  return (
    <div className="visit-history-card">
      {/* Title */}
      <h2 className="visit-history-title">Visit History</h2>

      {/* Table */}
      <div className="visit-history-table-container">
        <table className="visit-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id}>
                <td>{visit.date}</td>
                <td>{visit.doctor}</td>
                <td>{visit.reason}</td>
                <td>
                  <span className={`visit-status-badge ${getStatusClassName(visit.status)}`}>
                    {visit.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
