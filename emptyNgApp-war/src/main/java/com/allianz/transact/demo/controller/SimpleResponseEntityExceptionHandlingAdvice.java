package com.allianz.transact.demo.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.allianz.transact.demo.model.ErrorResult;

/**
 * Basic ResponseEntity<Object> based {@link ExceptionHandler}. Will return JSON in form of an {@link ErrorResult}
 * 
 * @author ckatzorke
 * 
 */
@ControllerAdvice
public class SimpleResponseEntityExceptionHandlingAdvice extends ResponseEntityExceptionHandler {

   @Override
   protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status,
         WebRequest request) {
      String msg = null;
      //add your status codes to be expected here!
      switch (status) {
         case BAD_REQUEST:
            msg = "Bad Request, Check values provided.";
            break;
         case METHOD_NOT_ALLOWED:
            msg = "Unsupported method (allowed: " + headers.getAllow() + ").";
            break;
         case NOT_FOUND:
            msg = "No service method found.";
            break;
         default:
            msg = "Check logfile and/or statuscode.";
            break;
      }
      ErrorResult error = new ErrorResult(msg, ex);
      error.addErrorObject("status", status.value());
      return super.handleExceptionInternal(ex, error, headers, status, request);
   }

}
