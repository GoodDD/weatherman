package com.spring.weatherman;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class WeathermanApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeathermanApplication.class, args);
    }
}
