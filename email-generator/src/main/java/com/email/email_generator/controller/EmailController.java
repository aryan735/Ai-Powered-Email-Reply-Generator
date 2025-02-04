package com.email.email_generator.controller;


import com.email.email_generator.Data.EmailRequest;
import com.email.email_generator.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/emailgenerator")
@CrossOrigin(origins = "*")
public class EmailController {
         private EmailService emailService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailService.emailReplyGenerator(emailRequest);
      return  ResponseEntity.ok(response);
    }
}
