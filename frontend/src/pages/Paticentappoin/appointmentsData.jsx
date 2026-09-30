// src/appointments/appointmentsData.js
// Demo data for the patient portal (also reused as the patient's visit history).

export const appointmentsData = [
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
  },
  {
    id: '5',
    date: 'Mar 12, 2026',
    doctor: 'Dr. Vaibhav Giradkar',
    reason: 'Migraine Consultation',
    status: 'Scheduled'
  },
  {
    id: '6',
    date: 'Jan 28, 2026',
    doctor: 'Dr. Abhas Pal',
    reason: 'Cardiology Screening',
    status: 'Cancelled'
  }
];

// Demo data for the doctor's Appointments page: 8 patients across the three tabs.
export const doctorAppointmentsData = [
  {
    id: 'd1',
    date: 'Mar 05, 2026',
    patient: 'Rahul Sharma',
    reason: 'Gastritis follow-up',
    status: 'Scheduled'
  },
  {
    id: 'd2',
    date: 'Mar 06, 2026',
    patient: 'Priya Verma',
    reason: 'Iron deficiency review',
    status: 'Scheduled'
  },
  {
    id: 'd3',
    date: 'Mar 09, 2026',
    patient: 'Amit Patel',
    reason: 'Cholesterol check',
    status: 'Scheduled'
  },
  {
    id: 'd4',
    date: 'Feb 20, 2026',
    patient: 'Sarah Johnson',
    reason: 'Blood pressure review',
    status: 'Completed'
  },
  {
    id: 'd5',
    date: 'Feb 18, 2026',
    patient: 'Chris Evan',
    reason: 'Diabetes follow-up',
    status: 'Completed'
  },
  {
    id: 'd6',
    date: 'Feb 15, 2026',
    patient: 'Neha Kapoor',
    reason: 'Thyroid profile review',
    status: 'Completed'
  },
  {
    id: 'd7',
    date: 'Feb 10, 2026',
    patient: 'Suresh Nair',
    reason: 'Cardiac consultation',
    status: 'Completed'
  },
  {
    id: 'd8',
    date: 'Feb 12, 2026',
    patient: 'Kavita Joshi',
    reason: 'Urine test review',
    status: 'Cancelled'
  }
];
