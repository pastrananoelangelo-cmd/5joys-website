package com.fivejoys.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(
            String employeeNumber,
            String password
    ) {
        if (userRepository.existsByEmployeeNumber(employeeNumber)) {
            throw new RuntimeException(
                    "Employee number already has an account: "
                            + employeeNumber
            );
        }

        User user = new User();

        user.setEmployeeNumber(employeeNumber);

        user.setPasswordHash(
                passwordEncoder.encode(password)
        );

        user.setEnabled(true);

        return userRepository.save(user);
    }

    public void updateUserPassword(
            User user,
            String password
    ) {
        user.setPasswordHash(
                passwordEncoder.encode(password)
        );

        userRepository.save(user);
    }
}