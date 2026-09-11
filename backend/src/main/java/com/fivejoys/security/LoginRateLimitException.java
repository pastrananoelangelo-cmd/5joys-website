package com.fivejoys.security;

public class LoginRateLimitException extends RuntimeException {

    private final long retryAfterSeconds;

    public LoginRateLimitException(long retryAfterSeconds) {
        super("Too many failed login attempts.");
        this.retryAfterSeconds = retryAfterSeconds;
    }

    public long getRetryAfterSeconds() {
        return retryAfterSeconds;
    }
}