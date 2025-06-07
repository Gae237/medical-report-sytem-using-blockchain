// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalReport {
    enum Role { None, Patient, Doctor }

    struct User {
        Role role;
        address[] accessList;
    }

    struct Report {
        string cid;
        address owner;
    }

    struct ReportInfo {
        string cid;
        address owner;
    }

    mapping(address => User) public users;
    mapping(address => Report[]) private reports;
    address[] private allPatients;

    modifier onlyPatient() {
        require(users[msg.sender].role == Role.Patient, "Only patients allowed");
        _;
    }

    modifier onlyDoctor() {
        require(users[msg.sender].role == Role.Doctor, "Only doctors allowed");
        _;
    }

    function register(Role _role) external {
        require(users[msg.sender].role == Role.None, "Already registered");
        require(_role == Role.Patient || _role == Role.Doctor, "Invalid role");

        users[msg.sender].role = _role;

        if (_role == Role.Patient) {
            allPatients.push(msg.sender);
        }
    }

    function getUser(address user) public view returns (Role) {
    return users[user].role;
}


    function uploadReport(string memory cid) external onlyPatient {
        reports[msg.sender].push(Report(cid, msg.sender));
    }

    function grantAccess(address doctor) external onlyPatient {
        require(users[doctor].role == Role.Doctor, "Target must be a doctor");
        address[] storage list = users[msg.sender].accessList;

        // prevent duplicate
        for (uint i = 0; i < list.length; i++) {
            if (list[i] == doctor) return;
        }

        list.push(doctor);
    }

    function revokeAccess(address doctor) external onlyPatient {
        address[] storage list = users[msg.sender].accessList;
        for (uint i = 0; i < list.length; i++) {
            if (list[i] == doctor) {
                list[i] = list[list.length - 1];
                list.pop();
                break;
            }
        }
    }

    function getAccessList() external view onlyPatient returns (address[] memory) {
        return users[msg.sender].accessList;
    }

    function getMyReports() external view returns (Report[] memory) {
        return reports[msg.sender];
    }

    function getPatientReports(address patient) external view onlyDoctor returns (Report[] memory) {
        require(hasAccess(patient, msg.sender), "Access not granted");
        return reports[patient];
    }

    function getReportsSharedWithDoctor() external view onlyDoctor returns (ReportInfo[] memory) {
        uint total = 0;

        // Count how many shared reports exist
        for (uint i = 0; i < allPatients.length; i++) {
            if (hasAccess(allPatients[i], msg.sender)) {
                total += reports[allPatients[i]].length;
            }
        }

        ReportInfo[] memory result = new ReportInfo[](total);
        uint index = 0;

        for (uint i = 0; i < allPatients.length; i++) {
            address patient = allPatients[i];
            if (hasAccess(patient, msg.sender)) {
                Report[] memory patientReports = reports[patient];
                for (uint j = 0; j < patientReports.length; j++) {
                    result[index++] = ReportInfo({
                        cid: patientReports[j].cid,
                        owner: patient
                    });
                }
            }
        }

        return result;
    }

    function hasAccess(address patient, address doctor) internal view returns (bool) {
        address[] memory list = users[patient].accessList;
        for (uint i = 0; i < list.length; i++) {
            if (list[i] == doctor) return true;
        }
        return false;
    }

    function checkAccess(address patient, address doctor) external view returns (bool) {
    return hasAccess(patient, doctor);
}

}
