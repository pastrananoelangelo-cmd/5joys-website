package com.fivejoys.leave.request;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository
        extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployeeNumber(
            String employeeNumber
    );

    List<LeaveRequest> findByEmployeeNumberAndStatusIn(
            String employeeNumber,
            List<String> statuses
    );

    void deleteByEmployeeNumber(
            String employeeNumber
    );

    List<LeaveRequest> findByStatusIn(
            List<String> statuses
    );

    void deleteByStatusIn(
            List<String> statuses
    );
}