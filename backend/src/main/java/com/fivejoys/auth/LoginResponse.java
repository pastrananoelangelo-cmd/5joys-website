package com.fivejoys.auth;

public class LoginResponse {

    private String token;
    private String employeeNumber;
    private String role;

    public LoginResponse(
            String token,
            String employeeNumber,
            String role
    ) {
        this.token = token;
        this.employeeNumber = employeeNumber;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public String getRole() {
        return role;
    }
}