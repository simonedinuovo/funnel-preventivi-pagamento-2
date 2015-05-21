package com.allianz.transact.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class City {

   public City(String textValue) {
      this(textValue, textValue);
   }

   public City(String text, String value) {
      this.text = text;
      this.value = value;
   }
   
   @JsonProperty
   public String text;
   @JsonProperty
   public String value;

}
