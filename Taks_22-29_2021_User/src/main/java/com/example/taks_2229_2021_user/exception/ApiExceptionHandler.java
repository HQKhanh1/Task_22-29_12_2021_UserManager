package com.example.taks_2229_2021_user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.Objects;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorMessage handleAllException(MethodArgumentNotValidException ex, WebRequest request) {
        return new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), Objects.requireNonNull(ex.getBindingResult().getFieldError()).getDefaultMessage(), new Date(), request.getDescription(false));
    }

    @ExceptionHandler(MailException.class)
    public ErrorMessage EmailNotException(MailException ex, WebRequest request) {
        return new ErrorMessage(400, ex.getMessage(), new Date());
    }

    @ExceptionHandler(UsernameException.class)
    public ErrorMessage UserExceptionNotFound(UsernameException ex, WebRequest request) {
        return new ErrorMessage(411, ex.getMessage(), new Date());
    }

    @ExceptionHandler(UsernameExitException.class)
    public ErrorMessage UserExceptionEmail(UsernameExitException ex, WebRequest request) {
        return new ErrorMessage(421, ex.getMessage(), new Date());
    }
}
