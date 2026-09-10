package com.fivejoys.leave.balance;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "leave_balances")
public class LeaveBalance {

    @Id
    @Column(name = "employee_number", length = 9)
    private String employeeNumber;

    @Column(name = "vacation_credit")
    private BigDecimal vacationCredit;

    @Column(name = "vacation_used")
    private BigDecimal vacationUsed;

    @Column(name = "sick_credit")
    private BigDecimal sickCredit;

    @Column(name = "sick_used")
    private BigDecimal sickUsed;

    @Column(name = "solo_parent_credit")
    private BigDecimal soloParentCredit;

    @Column(name = "solo_parent_used")
    private BigDecimal soloParentUsed;

    @Column(name = "maternal_paternal_credit")
    private BigDecimal maternalPaternalCredit;

    @Column(name = "maternal_paternal_used")
    private BigDecimal maternalPaternalUsed;

    public LeaveBalance() {}

    // getters and setters
    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public void setEmployeeNumber(String employeeNumber) {
        this.employeeNumber = employeeNumber;
    }

    public BigDecimal getVacationCredit() {
        return vacationCredit;
    }

    public void setVacationCredit(BigDecimal vacationCredit) {
        this.vacationCredit = vacationCredit;
    }

    public BigDecimal getVacationUsed() {
        return vacationUsed;
    }

    public void setVacationUsed(BigDecimal vacationUsed) {
        this.vacationUsed = vacationUsed;
    }

    public BigDecimal getSickCredit() {
        return sickCredit;
    }

    public void setSickCredit(BigDecimal sickCredit) {
        this.sickCredit = sickCredit;
    }

    public BigDecimal getSickUsed() {
        return sickUsed;
    }

    public void setSickUsed(BigDecimal sickUsed) {
        this.sickUsed = sickUsed;
    }

    public BigDecimal getSoloParentCredit() {
        return soloParentCredit;
    }

    public void setSoloParentCredit(BigDecimal soloParentCredit) {
        this.soloParentCredit = soloParentCredit;
    }

    public BigDecimal getSoloParentUsed() {
        return soloParentUsed;
    }

    public void setSoloParentUsed(BigDecimal soloParentUsed) {
        this.soloParentUsed = soloParentUsed;
    }

    public BigDecimal getMaternalPaternalCredit() {
        return maternalPaternalCredit;
    }

    public void setMaternalPaternalCredit(BigDecimal maternalPaternalCredit) {
        this.maternalPaternalCredit = maternalPaternalCredit;
    }

    public BigDecimal getMaternalPaternalUsed() {
        return maternalPaternalUsed;
    }

    public void setMaternalPaternalUsed(BigDecimal maternalPaternalUsed) {
        this.maternalPaternalUsed = maternalPaternalUsed;
    }
}