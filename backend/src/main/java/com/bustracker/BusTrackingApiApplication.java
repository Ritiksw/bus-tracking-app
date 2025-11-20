package com.bustracker;

import com.bustracker.auth.config.AdminBootstrapProperties;
import com.bustracker.auth.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({JwtProperties.class, AdminBootstrapProperties.class})
public class BusTrackingApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(BusTrackingApiApplication.class, args);
    }
}

