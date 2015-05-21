package com.allianz.transact.demo.model;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.hateoas.ResourceSupport;

import com.allianz.portal.aggregator.ErrorUtils;

public class ErrorResult implements Serializable {

   private static final long serialVersionUID = -4694146138163529128L;

   private static final Logger LOGGER = Logger.getLogger(ErrorResult.class.getCanonicalName());

   public final Map<String, Object> error = new LinkedHashMap<String, Object>();

   public ErrorResult() {
      this(ErrorUtils.generateErrorId(), "n/a", null);
   }

   public ErrorResult(String message) {
      this(ErrorUtils.generateErrorId(), message, null);
   }

   public ErrorResult(Exception e) {
      this(ErrorUtils.generateErrorId(), e.getMessage(), e);
   }

   public ErrorResult(String message, Exception e) {
      this(ErrorUtils.generateErrorId(), message, e);
   }

   public ErrorResult(String errorid, String message, Exception e) {
      error.put("errorid", errorid);
      error.put("message", message);
      // whenever an ErrorResult is created, log it!
      if (e != null) {
         LOGGER.log(Level.WARNING, this.toString(), e);
      }
      else {
         LOGGER.log(Level.WARNING, this.toString());
      }
   }

   public Map<String, Object> getError() {
      return error;
   }

   @Override
   public String toString() {
      return "ErrorResult [error=" + error + "]";
   }

   public void addErrorObject(String key, Object value) {
      error.put(key, value);
   }

}
