package com.fivejoys.auth;

public class LoginErrorResponse {

    private String message;
    private Integer attemptsRemaining;
    private Long retryAfterSeconds;

    public LoginErrorResponse(
            String message,
            Integer attemptsRemaining,
            Long retryAfterSeconds
    ) {
        this.message = message;
        this.attemptsRemaining = attemptsRemaining;
        this.retryAfterSeconds = retryAfterSeconds;
    }

    public String getMessage() {
        return message;
    }

    public Integer getAttemptsRemaining() {
        return attemptsRemaining;
    }

    public Long getRetryAfterSeconds() {
        return retryAfterSeconds;
    }
}