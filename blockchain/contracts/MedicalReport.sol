// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalReport {
    address public owner;

    struct Report {
        string cid;
        address patient;
        address doctor;
    }

    Report[] public reports;

    mapping(address => uint[]) public patientReports;

    constructor() {
        owner = msg.sender;
    }

    function uploadReport(string memory cid, address patient) public {
        require(msg.sender != address(0), "Invalid sender");
        reports.push(Report(cid, patient, msg.sender));
        patientReports[patient].push(reports.length - 1);
    }

    function getReports(address patient) public view returns (string[] memory) {
        uint[] memory ids = patientReports[patient];
        string[] memory cids = new string[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            cids[i] = reports[ids[i]].cid;
        }
        return cids;
    }
}
