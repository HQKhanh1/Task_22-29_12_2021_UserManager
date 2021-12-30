package com.example.taks_2229_2021_user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(ThrowException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage StudentNotFoundException(ThrowException ex, WebRequest request) {
        return new ErrorMessage(400, ex.getMessage(), new Date());
    }
}
