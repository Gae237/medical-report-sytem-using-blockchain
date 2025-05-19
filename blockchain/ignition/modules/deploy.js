import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MedicalReportModule = buildModule("MedicalReportModule", (m) => {
  const medicalReport = m.contract("MedicalReport");
  return { medicalReport };
});

export default MedicalReportModule;
