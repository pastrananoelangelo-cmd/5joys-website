package com.fivejoys.security;

public class IncorrectCurrentPasswordException
        extends RuntimeException {

    public IncorrectCurrentPasswordException() {
        super("Incorrect current password.");
    }
}