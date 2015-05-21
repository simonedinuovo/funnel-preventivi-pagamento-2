package com.allianz.transact.demo.controller;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.allianz.transact.demo.model.City;
import com.allianz.transact.demo.model.ErrorResult;
import com.allianz.transact.demo.model.Result;
import com.amos.utils.core.logging.EntryExitLogged;

/**
 * Some RestController to handle requests from the client side. Demo purpose
 */
@Controller(value = "rest")
public class RestController {


   @EntryExitLogged
   @RequestMapping(value = "isalive", method = RequestMethod.GET)
   public @ResponseBody Result isAlive(HttpServletRequest request) {
      Result result = new Result(request);
      result.addResultObject("result", "ok");
      result.add(new Link(request.getRequestURI()));
      return result;
   }

   @EntryExitLogged
   @RequestMapping(value = "cities", method = RequestMethod.GET)
   public @ResponseBody Result getCities(HttpServletRequest request) {
      Result result = new Result(request);
      result.add(new Link(request.getRequestURI()));
      result.addResultObject("cities", new City[] { new City("Bielefeld"), new City("Darmstadt"), new City("Mannheim")});
      return result;
   }

   @EntryExitLogged
   @RequestMapping(value = "doQuote", method = RequestMethod.POST)
   public @ResponseBody Result postQuote(HttpServletRequest request) {
      Result cities = new Result(request);
      cities.addResultObject("quote", "42");
      cities.add(new Link(request.getRequestURI()));
      return cities;
   }

   @ExceptionHandler
   @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
   public @ResponseBody ErrorResult handleException(Exception e) {
      // generate errorid
      ErrorResult errorResult = new ErrorResult(e);
      return errorResult;
   }

}
