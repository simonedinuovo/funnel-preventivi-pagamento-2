package com.allianz.transact.demo.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = { WebAppContextConfig.class})
public class TestRestController {
   MockMvc mockMvc;

   @Autowired
   WebApplicationContext wac;

   @Before
   public void setUp() {
      mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();

      // or simply as standalone
      // mockMvc = MockMvcBuilders.standaloneSetup(new SampleNoSuchRequestHandlingMethodController()).build();
   }

   @Test
   public void testFound() throws Exception {
      ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/isalive"));
      result.andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.links").isArray())
            .andExpect(MockMvcResultMatchers.jsonPath("$.links[?(@.rel=='self')]").exists());
   }

   @Test
   public void testMethodNotSupported() throws Exception {
      ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/isalive"));
      result.andExpect(MockMvcResultMatchers.status().is(405));
   }
}
