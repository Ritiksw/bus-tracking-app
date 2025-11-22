package com.bustracker;

import com.bustracker.auth.config.AdminBootstrapProperties;
import com.bustracker.auth.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import java.util.TimeZone;

@SpringBootApplication
@EnableConfigurationProperties({JwtProperties.class, AdminBootstrapProperties.class})
public class BusTrackingApiApplication {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        SpringApplication.run(BusTrackingApiApplication.class, args);
    }
}

