export const getReportsFromPatient = async (doctorAddress, patientAddress) => {
  const res = await fetch("http://localhost:5000/api/reports/view-patient", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doctorAddress, patientAddress })
  });

  if (!res.ok) throw new Error("Access denied or server error");

  const data = await res.json();
  return data.reports;
};
