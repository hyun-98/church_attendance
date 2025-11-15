package com.example.church.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // C:/church/uploads/** 경로를 /uploads/** URL로 매핑
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:///C:/church/uploads/");
    }
}
