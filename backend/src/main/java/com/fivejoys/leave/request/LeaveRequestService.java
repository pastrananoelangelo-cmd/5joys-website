package com.fivejoys.leave.request;

import com.fivejoys.employee.Employee;
import com.fivejoys.employee.EmployeeRepository;
import com.fivejoys.leave.balance.LeaveBalance;
import com.fivejoys.leave.balance.LeaveBalanceRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;

    public LeaveRequestService(
            LeaveRequestRepository leaveRequestRepository,
            EmployeeRepository employeeRepository,
            LeaveBalanceRepository leaveBalanceRepository
    ) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.employeeRepository = employeeRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    private LeaveRequestResponse toResponse(
            LeaveRequest request,
            String employeeName
    ) {

        LeaveRequestResponse response =
                new LeaveRequestResponse();

        response.setId(
                request.getId()
        );

        response.setEmployeeNumber(
                request.getEmployeeNumber()
        );

        response.setEmployeeName(
                employeeName
        );

        response.setLeaveType(
                request.getLeaveType()
        );

        response.setStartDate(
                request.getStartDate()
        );

        response.setEndDate(
                request.getEndDate()
        );

        response.setDays(
                request.getDays()
        );

        response.setReason(
                request.getReason()
        );

        response.setStatus(
                request.getStatus()
        );

        response.setSubmittedOn(
                request.getSubmittedOn()
        );

        response.setDecidedOn(
                request.getDecidedOn()
        );

        response.setRejectionReason(
                request.getRejectionReason()
        );

        return response;
    }

    public List<LeaveRequestResponse> getLeaveRequests(
            String employeeNumber
    ) {

        Employee employee =
                employeeRepository.findById(employeeNumber)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee not found: "
                                                + employeeNumber
                                )
                        );

        return leaveRequestRepository
                .findByEmployeeNumber(employeeNumber)
                .stream()
                .map(request ->
                        toResponse(
                                request,
                                employee.getEmployeeName()
                        )
                )
                .toList();
    }

    public LeaveRequestResponse createLeaveRequest(
            String employeeNumber,
            LeaveRequestCreateRequest request
    ) {

        Employee employee =
                findEmployee(employeeNumber);

        LeaveBalance balance =
                findLeaveBalance(employeeNumber);

        validateDates(request);

        BigDecimal requestedDays =
                calculateDays(request);

        String leaveType =
                normalizeLeaveType(request);

        validateAdvanceNotice(
                leaveType,
                request.getStartDate()
        );

        BigDecimal remainingBalance =
                getRemainingBalance(
                        balance,
                        leaveType
                );

        validateBalance(
                remainingBalance,
                requestedDays
        );

        validateNoOverlap(
                employeeNumber,
                request
        );

        LeaveRequest leaveRequest =
                buildLeaveRequest(
                        employeeNumber,
                        request,
                        leaveType,
                        requestedDays
                );

        LeaveRequest savedRequest =
                leaveRequestRepository.save(
                        leaveRequest
                );

        return toResponse(
                savedRequest,
                employee.getEmployeeName()
        );
    }

    private Employee findEmployee(
            String employeeNumber
    ) {

        return employeeRepository.findById(employeeNumber)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found: "
                                        + employeeNumber
                        )
                );
    }

    private LeaveBalance findLeaveBalance(
            String employeeNumber
    ) {

        return leaveBalanceRepository.findById(employeeNumber)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave balance not found: "
                                        + employeeNumber
                        )
                );
    }

    private void validateDates(
            LeaveRequestCreateRequest request
    ) {

        if (request.getStartDate() == null ||
                request.getEndDate() == null) {

            throw new RuntimeException(
                    "Start date and end date are required."
            );
        }

        if (request.getStartDate()
                .isBefore(LocalDate.now())) {

            throw new RuntimeException(
                    "Leave start date cannot be before today."
            );
        }

        if (request.getStartDate()
                .isAfter(request.getEndDate())) {

            throw new RuntimeException(
                    "Start date cannot be after end date."
            );
        }
    }

    private BigDecimal calculateDays(
            LeaveRequestCreateRequest request
    ) {

        long numberOfDays =
                request.getEndDate()
                        .toEpochDay()
                        - request.getStartDate()
                        .toEpochDay()
                        + 1;

        return BigDecimal.valueOf(numberOfDays);
    }

    private String normalizeLeaveType(
            LeaveRequestCreateRequest request
    ) {

        if (request.getLeaveType() == null ||
                request.getLeaveType().isBlank()) {

            throw new RuntimeException(
                    "Leave type is required."
            );
        }

        return request.getLeaveType()
                .trim()
                .toUpperCase();
    }

    private void validateAdvanceNotice(
            String leaveType,
            LocalDate startDate
    ) {

        if (leaveType.equals("VACATION") ||
                leaveType.equals("MATERNAL") ||
                leaveType.equals("PATERNAL")) {

            LocalDate minimumStartDate =
                    LocalDate.now().plusDays(5);

            if (startDate.isBefore(minimumStartDate)) {

                throw new RuntimeException(
                        leaveType +
                                " leave must be filed at least 5 days in advance."
                );
            }
        }
    }

    private BigDecimal getRemainingBalance(
            LeaveBalance balance,
            String leaveType
    ) {

        return switch (leaveType) {
            case "VACATION" -> balance.getVacationCredit()
                    .subtract(balance.getVacationUsed());
            case "SICK" -> balance.getSickCredit()
                    .subtract(balance.getSickUsed());
            case "SOLO_PARENT" -> balance.getSoloParentCredit()
                    .subtract(balance.getSoloParentUsed());
            case "MATERNAL", "PATERNAL" -> balance.getMaternalPaternalCredit()
                    .subtract(balance.getMaternalPaternalUsed());
            default -> throw new RuntimeException(
                    "Invalid leave type: " + leaveType
            );
        };
    }

    private void validateBalance(
            BigDecimal remainingBalance,
            BigDecimal requestedDays
    ) {

        if (remainingBalance.compareTo(requestedDays) < 0) {

            throw new RuntimeException(
                    "Insufficient leave balance."
            );
        }
    }

    private void validateNoOverlap(
            String employeeNumber,
            LeaveRequestCreateRequest request
    ) {

        List<LeaveRequest> activeRequests =
                leaveRequestRepository
                        .findByEmployeeNumberAndStatusIn(
                                employeeNumber,
                                List.of(
                                        "PENDING",
                                        "APPROVED"
                                )
                        );

        for (LeaveRequest existingRequest : activeRequests) {

            boolean overlaps =
                    !request.getStartDate()
                            .isAfter(existingRequest.getEndDate())
                            &&
                            !request.getEndDate()
                                    .isBefore(existingRequest.getStartDate());

            if (overlaps) {

                throw new RuntimeException(
                        "Leave dates overlap with an existing request."
                );
            }
        }
    }
    private LeaveRequest buildLeaveRequest(
            String employeeNumber,
            LeaveRequestCreateRequest request,
            String leaveType,
            BigDecimal requestedDays
    ) {

        LeaveRequest leaveRequest =
                new LeaveRequest();

        leaveRequest.setEmployeeNumber(
                employeeNumber
        );

        leaveRequest.setLeaveType(
                leaveType
        );

        leaveRequest.setStartDate(
                request.getStartDate()
        );

        leaveRequest.setEndDate(
                request.getEndDate()
        );

        leaveRequest.setDays(
                requestedDays
        );

        leaveRequest.setReason(
                request.getReason()
        );

        leaveRequest.setStatus(
                "PENDING"
        );

        leaveRequest.setSubmittedOn(
                LocalDate.now()
        );

        leaveRequest.setDecidedOn(null);

        leaveRequest.setRejectionReason(null);

        return leaveRequest;
    }

    @Transactional
    public LeaveRequestResponse approveLeaveRequest(
            Long id
    ) {

        LeaveRequest leaveRequest =
                findLeaveRequest(id);

        validatePending(leaveRequest);

        LeaveBalance balance =
                findLeaveBalance(
                        leaveRequest.getEmployeeNumber()
                );

        BigDecimal remainingBalance =
                getRemainingBalance(
                        balance,
                        leaveRequest.getLeaveType()
                );

        validateBalance(
                remainingBalance,
                leaveRequest.getDays()
        );

        deductLeaveBalance(
                balance,
                leaveRequest.getLeaveType(),
                leaveRequest.getDays()
        );

        leaveRequest.setStatus("APPROVED");

        leaveRequest.setDecidedOn(
                LocalDate.now()
        );

        leaveRequest.setRejectionReason(null);

        leaveRequestRepository.save(
                leaveRequest
        );

        leaveBalanceRepository.save(
                balance
        );

        Employee employee =
                findEmployee(
                        leaveRequest.getEmployeeNumber()
                );

        return toResponse(
                leaveRequest,
                employee.getEmployeeName()
        );
    }

    public LeaveRequestResponse rejectLeaveRequest(
            Long id,
            LeaveRequestDecisionRequest request
    ) {

        LeaveRequest leaveRequest =
                findLeaveRequest(id);

        validatePending(leaveRequest);

        if (request.getRejectionReason() == null ||
                request.getRejectionReason().isBlank()) {

            throw new RuntimeException(
                    "Rejection reason is required."
            );
        }

        leaveRequest.setStatus("REJECTED");

        leaveRequest.setDecidedOn(
                LocalDate.now()
        );

        leaveRequest.setRejectionReason(
                request.getRejectionReason()
        );

        LeaveRequest savedRequest =
                leaveRequestRepository.save(
                        leaveRequest
                );

        Employee employee =
                findEmployee(
                        leaveRequest.getEmployeeNumber()
                );

        return toResponse(
                savedRequest,
                employee.getEmployeeName()
        );
    }

    private LeaveRequest findLeaveRequest(Long id) {

        return leaveRequestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave request not found: " + id
                        )
                );
    }

    private void validatePending(
            LeaveRequest leaveRequest
    ) {

        if (!leaveRequest.getStatus().equals("PENDING")) {

            throw new RuntimeException(
                    "Only pending leave requests can be processed."
            );
        }
    }

    private void deductLeaveBalance(
            LeaveBalance balance,
            String leaveType,
            BigDecimal days
    ) {

        switch (leaveType) {

            case "VACATION":
                balance.setVacationUsed(
                        balance.getVacationUsed()
                                .add(days)
                );
                break;

            case "SICK":
                balance.setSickUsed(
                        balance.getSickUsed()
                                .add(days)
                );
                break;

            case "SOLO_PARENT":
                balance.setSoloParentUsed(
                        balance.getSoloParentUsed()
                                .add(days)
                );
                break;

            case "MATERNAL":
            case "PATERNAL":
                balance.setMaternalPaternalUsed(
                        balance.getMaternalPaternalUsed()
                                .add(days)
                );
                break;

            default:
                throw new RuntimeException(
                        "Invalid leave type: " + leaveType
                );
        }
    }

}