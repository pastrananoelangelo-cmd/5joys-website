package com.fivejoys.leave.balance.dto;

import java.math.BigDecimal;

public class LeaveBalanceUpdateRequest {

    private BigDecimal vacationCredit;
    private BigDecimal sickCredit;
    private BigDecimal soloParentCredit;
    private BigDecimal maternalPaternalCredit;

    // getters/setters
    public BigDecimal getVacationCredit() {
        return this.vacationCredit;
    }

    public void setVacationCredit(BigDecimal vacationCredit) {
        this.vacationCredit = vacationCredit;
    }

    public BigDecimal getSickCredit() {
        return this.sickCredit;
    }

    public void setSickCredit(BigDecimal sickCredit) {
        this.sickCredit = sickCredit;
    }

    public BigDecimal getSoloParentCredit() {
        return this.soloParentCredit;
    }

    public void setSoloParentCredit(BigDecimal soloParentCredit) {
        this.soloParentCredit = soloParentCredit;
    }

    public BigDecimal getMaternalPaternalCredit() {
        return this.maternalPaternalCredit;
    }

    public void setMaternalPaternalCredit(BigDecimal maternalPaternalCredit) {
        this.maternalPaternalCredit = maternalPaternalCredit;
    }
}