package com.fivejoys.config;

import com.fivejoys.user.User;
import com.fivejoys.user.UserRepository;
import com.fivejoys.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;

    public DataInitializer(
            UserService userService,
            UserRepository userRepository
    ) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {

        createUserIfMissing(
                "1001-0001",
                "1234"
        );

        createUserIfMissing(
                "1001-0002",
                "1234"
        );

        createUserIfMissing(
                "1001-0003",
                "1234"
        );

        createUserIfMissing(
                "1001-0004",
                "1234"
        );

        createUserIfMissing(
                "1001-0005",
                "1234"
        );

        createUserIfMissing(
                "1001-0006",
                "1234"
        );
    }

    private void createUserIfMissing(
            String employeeNumber,
            String password
    ) {

        User user =
                userRepository
                        .findByEmployeeNumber(employeeNumber)
                        .orElse(null);

        if (user == null) {
            userService.createUser(
                    employeeNumber,
                    password
            );
        }
    }
}