package com.fivejoys.config;

import com.fivejoys.auth.ApiErrorResponse;
import com.fivejoys.security.IncorrectCurrentPasswordException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException e
    ) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        new ApiErrorResponse(
                                e.getMessage()
                        )
                );
    }

    @ExceptionHandler(IncorrectCurrentPasswordException.class)
    public ResponseEntity<ApiErrorResponse> handleIncorrectCurrentPassword(
            IncorrectCurrentPasswordException e
    ) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        new ApiErrorResponse(
                                e.getMessage()
                        )
                );
    }
}