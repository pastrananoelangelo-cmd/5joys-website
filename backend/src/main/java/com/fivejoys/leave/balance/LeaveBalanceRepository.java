package com.fivejoys.leave.balance;

import com.fivejoys.leave.balance.LeaveBalance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveBalanceRepository
        extends JpaRepository<LeaveBalance, String> {
}