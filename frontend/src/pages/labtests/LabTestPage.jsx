import { useState } from "react";
import AddLabTestForm from "./AddLabTestForm";
import LabTestTable from "./LabTestTable";
import labTestData from "./labTestData";
import "./labtest.css";

function LabTestPage() {
  const [tests, setTests] = useState(labTestData);
  const [search, setSearch] = useState("");

  // ✅ Add new test
  const handleAddTest = (newTest) => {
    setTests((prev) => [
      ...prev,
      {
        ...newTest,
        id: Date.now(),
        status: "Pending",
        report: null,
        reportName: "",
      },
    ]);
  };

  // ✅ Upload report
  const handleUploadReport = (id, file) => {
    const fileURL = URL.createObjectURL(file);

    setTests((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              report: fileURL,
              reportName: file.name,
              status: "Completed",
            }
          : t
      )
    );

    alert("✅ Report uploaded! Patient notified.");
  };

  // ✅ Generate report
  const handleGenerateReport = (id) => {
    setTests((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "Completed",
              reportName: `${t.patientName}_report.pdf`,
            }
          : t
      )
    );

    alert("✅ Lab report generated!");
  };

  // 🔍 Search filter
  const filteredTests = tests.filter(
    (t) =>
      t.patientName.toLowerCase().includes(search.toLowerCase()) ||
      t.testName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lab-container">
      <h2>🔬 Lab Test Management</h2>

      <input
        type="text"
        placeholder="Search patient or test..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <AddLabTestForm onAdd={handleAddTest} />

      <LabTestTable
        tests={filteredTests}
        onUpload={handleUploadReport}
        onGenerate={handleGenerateReport}
      />
    </div>
  );
}

export default LabTestPage;
