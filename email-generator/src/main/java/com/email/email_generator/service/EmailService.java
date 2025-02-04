package com.email.email_generator.service;


import com.email.email_generator.Data.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailService {
    private final WebClient  webClient;

    public EmailService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;
    public String emailReplyGenerator(EmailRequest emailRequest){
        //Build the prompt
        String prompt = buildPrompt(emailRequest);
       //Craft a request
        Map<String,Object> requestBody=Map.of(
                "contents", new Object[]{
                        Map.of("parts",new Object[]{
                             Map.of("text",prompt)
                        })
                }
        );

        //Do request and get response
         String response = webClient.post()
                 .uri(geminiApiUrl+geminiApiKey)
                 .header("Content-Type","application/json")
                 .bodyValue(requestBody)
                 .retrieve()
                 .bodyToMono(String.class)
                 .block();

         //Extract response and Return
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try{
            /*It's a tool from jackson library that helps in working json data so
            it can read, write and convert json data to java objects and java objects to json data  vice-versa*/
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e){
            return "Error processing request: " +e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. Please don't generate a subject line.");
        if(emailRequest.getEmailTone() !=null && !emailRequest.getEmailTone().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getEmailTone()).append(" Email tone");
        }
        prompt.append("\nOriginal email :\n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
