package com.fivejoys.security;

import com.fivejoys.employee.Employee;
import com.fivejoys.employee.EmployeeRepository;
import com.fivejoys.user.User;
import com.fivejoys.user.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;

    public CustomUserDetailsService(
            UserRepository userRepository,
            EmployeeRepository employeeRepository
    ) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String employeeNumber
    ) {

        User user =
                userRepository
                        .findByEmployeeNumber(employeeNumber)
                        .orElseThrow(() ->
                                new UsernameNotFoundException(
                                        "User not found: "
                                                + employeeNumber
                                )
                        );

        Employee employee =
                employeeRepository
                        .findById(employeeNumber)
                        .orElseThrow(() ->
                                new UsernameNotFoundException(
                                        "Employee not found: "
                                                + employeeNumber
                                )
                        );

        return new CustomUserDetails(
                user,
                employee
        );
    }
}