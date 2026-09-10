package com.fivejoys.leave.balance;

import com.fivejoys.employee.Employee;
import com.fivejoys.employee.EmployeeRepository;
import com.fivejoys.leave.balance.dto.LeaveBalanceUpdateRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class LeaveBalanceService {

    private final LeaveBalanceRepository leaveBalanceRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveBalanceService(
            LeaveBalanceRepository leaveBalanceRepository,
            EmployeeRepository employeeRepository
    ) {
        this.leaveBalanceRepository = leaveBalanceRepository;
        this.employeeRepository = employeeRepository;
    }

    public LeaveBalanceResponse getLeaveBalance(
            String employeeNumber
    ) {
        LeaveBalance balance =
                leaveBalanceRepository.findById(employeeNumber)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave balance not found: "
                                                + employeeNumber
                                )
                        );

        Employee employee =
                employeeRepository.findById(employeeNumber)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee not found: "
                                                + employeeNumber
                                )
                        );

        LeaveBalanceResponse response =
                new LeaveBalanceResponse();

        response.setEmployeeNumber(
                balance.getEmployeeNumber()
        );

        response.setEmployeeName(
                employee.getEmployeeName()
        );

        response.setVacationCredit(
                balance.getVacationCredit()
        );

        response.setVacationUsed(
                balance.getVacationUsed()
        );

        response.setVacationRemaining(
                balance.getVacationCredit()
                        .subtract(balance.getVacationUsed())
        );

        response.setSickCredit(
                balance.getSickCredit()
        );

        response.setSickUsed(
                balance.getSickUsed()
        );

        response.setSickRemaining(
                balance.getSickCredit()
                        .subtract(balance.getSickUsed())
        );

        response.setSoloParentCredit(
                balance.getSoloParentCredit()
        );

        response.setSoloParentUsed(
                balance.getSoloParentUsed()
        );

        response.setSoloParentRemaining(
                balance.getSoloParentCredit()
                        .subtract(balance.getSoloParentUsed())
        );

        response.setMaternalPaternalCredit(
                balance.getMaternalPaternalCredit()
        );

        response.setMaternalPaternalUsed(
                balance.getMaternalPaternalUsed()
        );

        response.setMaternalPaternalRemaining(
                balance.getMaternalPaternalCredit()
                        .subtract(balance.getMaternalPaternalUsed())
        );

        return response;
    }

    private void notNegative(LeaveBalanceUpdateRequest request) {
        if (request.getVacationCredit().compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException(
                    "Vacation credit cannot be negative."
            );
        }

        if (request.getSickCredit().compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException(
                    "Sick credit cannot be negative."
            );
        }

        if (request.getSoloParentCredit().compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException(
                    "Solo parent credit cannot be negative."
            );
        }

        if (request.getMaternalPaternalCredit().compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException(
                    "Maternal/paternal credit cannot be negative."
            );
        }
    }

    private void moreThanLeave(LeaveBalance balance, LeaveBalanceUpdateRequest request) {
        if (request.getVacationCredit()
                .compareTo(balance.getVacationUsed()) < 0) {

            throw new RuntimeException(
                    "Vacation credit cannot be less than used leave."
            );
        }

        if (request.getSickCredit()
                .compareTo(balance.getSickUsed()) < 0) {

            throw new RuntimeException(
                    "Sick credit cannot be less than used leave."
            );
        }

        if (request.getSoloParentCredit()
                .compareTo(balance.getSoloParentUsed()) < 0) {

            throw new RuntimeException(
                    "Solo parent credit cannot be less than used leave."
            );
        }

        if (request.getMaternalPaternalCredit()
                .compareTo(balance.getMaternalPaternalUsed()) < 0) {

            throw new RuntimeException(
                    "Maternal/paternal credit cannot be less than used leave."
            );
        }
    }

    public LeaveBalanceResponse updateLeaveBalance(
            String employeeNumber,
            LeaveBalanceUpdateRequest request
    ) {

        LeaveBalance balance =
                leaveBalanceRepository.findById(employeeNumber)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave balance not found: "
                                                + employeeNumber
                                )
                        );

        notNegative(request);
        moreThanLeave(balance, request);

        balance.setVacationCredit(
                request.getVacationCredit()
        );

        balance.setSickCredit(
                request.getSickCredit()
        );

        balance.setSoloParentCredit(
                request.getSoloParentCredit()
        );

        balance.setMaternalPaternalCredit(
                request.getMaternalPaternalCredit()
        );

        leaveBalanceRepository.save(balance);

        return getLeaveBalance(employeeNumber);
    }
}