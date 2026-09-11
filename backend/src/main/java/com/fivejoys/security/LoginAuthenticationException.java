package com.fivejoys.security;

public class LoginAuthenticationException
        extends RuntimeException {

    private final int attemptsRemaining;

    public LoginAuthenticationException(
            int attemptsRemaining
    ) {
        super("Invalid employee ID or password.");
        this.attemptsRemaining =
                attemptsRemaining;
    }

    public int getAttemptsRemaining() {
        return attemptsRemaining;
    }
}