package com.fivejoys.leave.balance;

import org.springframework.web.bind.annotation.*;
import com.fivejoys.leave.balance.dto.LeaveBalanceUpdateRequest;

@RestController
@RequestMapping("/api/leave-balances")
public class LeaveBalanceController {

    private final LeaveBalanceService leaveBalanceService;

    public LeaveBalanceController(
            LeaveBalanceService leaveBalanceService
    ) {
        this.leaveBalanceService = leaveBalanceService;
    }

    @GetMapping("/{employeeNumber}")
    public LeaveBalanceResponse getLeaveBalance(
            @PathVariable String employeeNumber
    ) {
        return leaveBalanceService.getLeaveBalance(
                employeeNumber
        );
    }

    @PutMapping("/{employeeNumber}")
    public LeaveBalanceResponse updateLeaveBalance(
            @PathVariable String employeeNumber,
            @RequestBody LeaveBalanceUpdateRequest request
    ) {
        return leaveBalanceService.updateLeaveBalance(
                employeeNumber,
                request
        );
    }
}