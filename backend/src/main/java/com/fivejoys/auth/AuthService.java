package com.fivejoys.auth;

import com.fivejoys.security.*;

import com.fivejoys.user.User;
import com.fivejoys.user.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final LoginAttemptService loginAttemptService;
    private final PasswordValidator passwordValidator;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            LoginAttemptService loginAttemptService,
            PasswordValidator passwordValidator, PasswordValidator passwordValidator1
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.loginAttemptService = loginAttemptService;
        this.passwordValidator = passwordValidator1;
    }

    public LoginResponse login(LoginRequest request) {

        String key =
                request.getEmployeeNumber();

        if (loginAttemptService.isBlocked(key)) {

            long remainingSeconds =
                    loginAttemptService
                            .getRemainingCooldownSeconds(key);

            throw new LoginRateLimitException(
                    remainingSeconds
            );
        }

        try {

            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getEmployeeNumber(),
                                    request.getPassword()
                            )
                    );

            loginAttemptService.recordSuccess(key);

            CustomUserDetails userDetails =
                    (CustomUserDetails) authentication.getPrincipal();

            String token =
                    jwtService.generateToken(userDetails);

            String role =
                    userDetails.getAuthorities()
                            .iterator()
                            .next()
                            .getAuthority()
                            .replace("ROLE_", "");

            return new LoginResponse(
                    token,
                    userDetails.getEmployee().getEmployeeNumber(),
                    role
            );

        } catch (Exception e) {

            loginAttemptService.recordFailure(key);

            int attemptsRemaining =
                    loginAttemptService
                            .getAttemptsRemaining(key);

            if (attemptsRemaining == 0) {

                long remainingSeconds =
                        loginAttemptService
                                .getRemainingCooldownSeconds(key);

                throw new LoginRateLimitException(
                        remainingSeconds
                );
            }

            throw new LoginAuthenticationException(
                    attemptsRemaining
            );
        }
    }

    public void changePassword(
            String employeeNumber,
            ChangePasswordRequest request
    ) {

        User user =
                userRepository
                        .findByEmployeeNumber(employeeNumber)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found."
                                )
                        );

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPasswordHash()
        )) {
            throw new IncorrectCurrentPasswordException();
        }

        passwordValidator.validate(
                request.getNewPassword()
        );

        user.setPasswordHash(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);
    }

}