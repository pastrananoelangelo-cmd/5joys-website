package com.fivejoys.leave.request;

public class LeaveRequestDecisionRequest {

    private String rejectionReason;

    public LeaveRequestDecisionRequest() {}

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}