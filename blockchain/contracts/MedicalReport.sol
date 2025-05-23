// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MedicalReport {
    enum Role { None, Patient, Doctor }

    struct User {
        Role role;
        string metadata; // Optional future use (e.g. IPFS profile)
    }

    struct Report {
        string ipfsHash;
        address owner;
        uint timestamp;
    }

    mapping(address => User) public users;
    mapping(address => Report[]) public patientReports;
    mapping(address => mapping(address => bool)) public reportAccess; // doctor => patient => access

    event Registered(address indexed user, Role role);
    event ReportUploaded(address indexed patient, string ipfsHash);
    event AccessGranted(address indexed patient, address indexed doctor);
    event AccessRevoked(address indexed patient, address indexed doctor);

    modifier onlyRole(Role expected) {
        require(users[msg.sender].role == expected, "Unauthorized role");
        _;
    }

    modifier onlyRegistered() {
        require(users[msg.sender].role != Role.None, "Not registered");
        _;
    }

    function register(Role _role) external {
        require(_role == Role.Patient || _role == Role.Doctor, "Invalid role");
        require(users[msg.sender].role == Role.None, "Already registered");

        users[msg.sender] = User(_role, "");
        emit Registered(msg.sender, _role);
    }

    function uploadReport(string memory _ipfsHash) external onlyRole(Role.Patient) {
        patientReports[msg.sender].push(Report(_ipfsHash, msg.sender, block.timestamp));
        emit ReportUploaded(msg.sender, _ipfsHash);
    }

    function grantAccess(address _doctor) external onlyRole(Role.Patient) {
        require(users[_doctor].role == Role.Doctor, "Target is not a doctor");
        reportAccess[_doctor][msg.sender] = true;
        emit AccessGranted(msg.sender, _doctor);
    }

    function revokeAccess(address _doctor) external onlyRole(Role.Patient) {
        require(reportAccess[_doctor][msg.sender], "Access not granted");
        reportAccess[_doctor][msg.sender] = false;
        emit AccessRevoked(msg.sender, _doctor);
    }

    function getMyReports() external view onlyRole(Role.Patient) returns (Report[] memory) {
        return patientReports[msg.sender];
    }

    function getPatientReports(address _patient) external view onlyRole(Role.Doctor) returns (Report[] memory) {
        require(reportAccess[msg.sender][_patient], "Access denied by patient");
        return patientReports[_patient];
    }

    function getUser(address _user) external view returns (User memory) {
        return users[_user];
    }
}
