package com.allianz.transact.demo.model;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.ResourceSupport;

/**
 * The generic json result
 * 
 * @author ckatzorke
 *
 */
public class Result extends ResourceSupport implements Serializable {
   private static final long serialVersionUID = 2569196901438096359L;

   public final Map<String, Object> result = new LinkedHashMap<String, Object>();

   public Result(HttpServletRequest request) {
      add(new Link(request.getRequestURI().substring(request.getRequestURI().indexOf(request.getContextPath()))));
   }

   public void addResultObject(String key, Object object) {
      result.put(key, object);
   }
}
