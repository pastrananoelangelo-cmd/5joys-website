package com.fivejoys.security;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {

    private static final int MAX_ATTEMPTS = 3;
    private static final long COOLDOWN_SECONDS = 60;

    private final Map<String, LoginAttempt> attempts =
            new ConcurrentHashMap<>();

    public boolean isBlocked(String key) {

        LoginAttempt attempt = attempts.get(key);

        if (attempt == null) {
            return false;
        }

        if (attempt.blockedUntil == null) {
            return false;
        }

        if (Instant.now().isAfter(attempt.blockedUntil)) {

            attempts.remove(key);

            return false;
        }

        return true;
    }

    public void recordFailure(String key) {

        LoginAttempt attempt =
                attempts.computeIfAbsent(
                        key,
                        k -> new LoginAttempt()
                );

        attempt.failedAttempts++;

        if (attempt.failedAttempts >= MAX_ATTEMPTS) {

            attempt.blockedUntil =
                    Instant.now()
                            .plusSeconds(COOLDOWN_SECONDS);
        }
    }

    public long getRemainingCooldownSeconds(String key) {

        LoginAttempt attempt = attempts.get(key);

        if (attempt == null ||
                attempt.blockedUntil == null) {

            return 0;
        }

        long remaining =
                java.time.Duration
                        .between(
                                Instant.now(),
                                attempt.blockedUntil
                        )
                        .getSeconds();

        return Math.max(0, remaining);
    }

    public int getAttemptsRemaining(String key) {

        LoginAttempt attempt = attempts.get(key);

        if (attempt == null) {
            return MAX_ATTEMPTS;
        }

        return Math.max(
                0,
                MAX_ATTEMPTS - attempt.failedAttempts
        );
    }

    public void recordSuccess(String key) {
        attempts.remove(key);
    }

    private static class LoginAttempt {

        private int failedAttempts = 0;

        private Instant blockedUntil = null;
    }
}