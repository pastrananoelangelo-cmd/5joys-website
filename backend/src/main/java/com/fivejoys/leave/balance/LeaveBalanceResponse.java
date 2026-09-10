package com.fivejoys.leave.balance;

import java.math.BigDecimal;

public class LeaveBalanceResponse {

    private String employeeNumber;
    private String employeeName;

    private BigDecimal vacationCredit;
    private BigDecimal vacationUsed;
    private BigDecimal vacationRemaining;

    private BigDecimal sickCredit;
    private BigDecimal sickUsed;
    private BigDecimal sickRemaining;

    private BigDecimal soloParentCredit;
    private BigDecimal soloParentUsed;
    private BigDecimal soloParentRemaining;

    private BigDecimal maternalPaternalCredit;
    private BigDecimal maternalPaternalUsed;
    private BigDecimal maternalPaternalRemaining;

    public LeaveBalanceResponse() {}

    // getters and setters
    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public void setEmployeeNumber(String employeeNumber) {
        this.employeeNumber = employeeNumber;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
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

    public BigDecimal getVacationRemaining() {
        return vacationRemaining;
    }

    public void setVacationRemaining(BigDecimal vacationRemaining) {
        this.vacationRemaining = vacationRemaining;
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

    public BigDecimal getSickRemaining() {
        return sickRemaining;
    }

    public void setSickRemaining(BigDecimal sickRemaining) {
        this.sickRemaining = sickRemaining;
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

    public BigDecimal getSoloParentRemaining() {
        return soloParentRemaining;
    }

    public void setSoloParentRemaining(BigDecimal soloParentRemaining) {
        this.soloParentRemaining = soloParentRemaining;
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

    public BigDecimal getMaternalPaternalRemaining() {
        return maternalPaternalRemaining;
    }

    public void setMaternalPaternalRemaining(BigDecimal maternalPaternalRemaining) {
        this.maternalPaternalRemaining = maternalPaternalRemaining;
    }
}