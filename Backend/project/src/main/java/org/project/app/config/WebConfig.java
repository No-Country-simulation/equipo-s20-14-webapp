package org.project.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")  // Mejor que allowedOrigins para mayor flexibilidad
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Añadir OPTIONS para preflight
                .allowedHeaders("*")         // Permitir todos los headers
                .exposedHeaders("*")         // Exponer los headers necesarios al front
                .allowCredentials(false)
                .maxAge(3600);               // Cachear preflight por 1 hora
    }
}
