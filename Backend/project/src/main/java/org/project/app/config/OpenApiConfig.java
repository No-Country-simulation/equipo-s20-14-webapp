package org.project.app.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("API Documentation: Clara").version("1.0"))
                .servers(List.of(
                        new Server().url("http://localhost:8080/"),
                        new Server().url("http://clara-ukyz.onrender.com/")
                ));
    }
}