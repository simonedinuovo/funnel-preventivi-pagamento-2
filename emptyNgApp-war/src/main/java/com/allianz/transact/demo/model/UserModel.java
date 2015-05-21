package com.allianz.transact.demo.model;

public class UserModel {

   private String userId;

   private String userName;

   public UserModel(String userId, String userName) {
      super();
      this.userId = userId;
      this.userName = userName;
   }

   public String getUserId() {
      return userId;
   }

   public void setUserId(String userId) {
      this.userId = userId;
   }

   public String getUserName() {
      return userName;
   }

   public void setUserName(String userName) {
      this.userName = userName;
   }

}
