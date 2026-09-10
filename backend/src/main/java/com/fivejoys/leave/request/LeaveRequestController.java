package com.fivejoys.leave.request;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;
    private final LeaveRequestArchiveService leaveRequestArchiveService;

    public LeaveRequestController(
            LeaveRequestService leaveRequestService,
            LeaveRequestArchiveService leaveRequestArchiveService
    ) {
        this.leaveRequestService =
                leaveRequestService;

        this.leaveRequestArchiveService =
                leaveRequestArchiveService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LeaveRequestResponse createLeaveRequest(
            @RequestParam String employeeNumber,
            @RequestBody LeaveRequestCreateRequest request
    ) {
        return leaveRequestService.createLeaveRequest(
                employeeNumber,
                request
        );
    }

    @GetMapping
    public List<LeaveRequestResponse> getLeaveRequests(
            @RequestParam String employeeNumber
    ) {
        return leaveRequestService.getLeaveRequests(
                employeeNumber
        );
    }

    @PutMapping("/{id}/approve")
    public LeaveRequestResponse approveLeaveRequest(
            @PathVariable Long id
    ) {

        return leaveRequestService
                .approveLeaveRequest(id);
    }

    @PutMapping("/{id}/reject")
    public LeaveRequestResponse rejectLeaveRequest(
            @PathVariable Long id,
            @RequestBody LeaveRequestDecisionRequest request
    ) {

        return leaveRequestService
                .rejectLeaveRequest(
                        id,
                        request
                );
    }

    @PostMapping("/archive")
    public ResponseEntity<byte[]> archiveLeaveRequests()
            throws IOException {

        byte[] excelFile =
                leaveRequestArchiveService
                        .archiveCompletedLeaveRequests();

        String filename =
                "Leave_Records_Archive_"
                        + LocalDate.now()
                        + ".xlsx";

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=" + filename
                )
                .contentType(
                        MediaType.parseMediaType(
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        )
                )
                .body(excelFile);
    }
}