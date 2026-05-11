import jsPDF from "jspdf";

function LabTestTable({ tests, onUpload, onGenerate }) {
  const generatePDF = (test) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Hospital Lab Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Patient Name: ${test.patientName}`, 20, 40);
    doc.text(`Test Name: ${test.testName}`, 20, 50);
    doc.text(`Date: ${test.date}`, 20, 60);
    doc.text(`Status: Completed`, 20, 70);

    doc.text("Result: Normal", 20, 90);
    doc.text("Doctor Signature: __________", 20, 120);

    doc.save(`${test.patientName}_report.pdf`);
  };

  return (
    <table className="lab-table">
      <thead>
        <tr>
          <th>Patient</th>
          <th>Test</th>
          <th>Date</th>
          <th>Status</th>
          <th>Upload</th>
          <th>Report</th>
          <th>Generate</th>
        </tr>
      </thead>

      <tbody>
        {tests.map((t) => (
          <tr key={t.id}>
            <td>{t.patientName}</td>
            <td>{t.testName}</td>
            <td>{t.date}</td>

            {/* 🎨 Status badge */}
            <td>
              <span
                className={
                  t.status === "Completed"
                    ? "badge-complete"
                    : "badge-pending"
                }
              >
                {t.status}
              </span>
            </td>

            {/* 📤 Upload */}
            <td>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                disabled={t.status === "Completed"}
                onChange={(e) =>
                  onUpload(t.id, e.target.files[0])
                }
              />
            </td>

            {/* 🔍 View report */}
            <td>
              {t.report ? (
                <a href={t.report} target="_blank" rel="noreferrer">
                  View
                </a>
              ) : (
                "—"
              )}
            </td>

            {/* ⚡ Generate */}
            <td>
              <button
                className="generate-btn"
                disabled={t.status === "Completed"}
                onClick={() => {
                  onGenerate(t.id);
                  generatePDF(t);
                }}
              >
                Generate
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LabTestTable;
