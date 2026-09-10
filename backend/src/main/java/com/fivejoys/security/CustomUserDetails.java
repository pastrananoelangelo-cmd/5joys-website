package com.fivejoys.security;

import com.fivejoys.employee.Employee;
import com.fivejoys.user.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private final User user;
    private final Employee employee;

    public CustomUserDetails(
            User user,
            Employee employee
    ) {
        this.user = user;
        this.employee = employee;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        String position = employee.getPosition();

        if (
                "HR Assistant".equalsIgnoreCase(position) ||
                        "HR MANAGER".equalsIgnoreCase(position)
        ) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_HR")
            );
        }

        return List.of(
                new SimpleGrantedAuthority("ROLE_EMPLOYEE")
        );
    }

    @Override
    public String getPassword() {
        return user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return user.getEmployeeNumber();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }

    public User getUser() {
        return user;
    }

    public Employee getEmployee() {
        return employee;
    }
}