package com.fivejoys.auth;

import com.fivejoys.security.LoginAuthenticationException;
import com.fivejoys.security.LoginRateLimitException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        try {

            LoginResponse response =
                    authService.login(request);

            return ResponseEntity.ok(response);

        } catch (LoginAuthenticationException e) {

            LoginErrorResponse response =
                    new LoginErrorResponse(
                            e.getMessage(),
                            e.getAttemptsRemaining(),
                            null
                    );

            return ResponseEntity
                    .status(401)
                    .body(response);

        } catch (LoginRateLimitException e) {

            LoginErrorResponse response =
                    new LoginErrorResponse(
                            e.getMessage(),
                            null,
                            e.getRetryAfterSeconds()
                    );

            return ResponseEntity
                    .status(429)
                    .body(response);
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication
    ) {

        String employeeNumber =
                authentication.getName();

        authService.changePassword(
                employeeNumber,
                request
        );

        return ResponseEntity.noContent().build();
    }
}