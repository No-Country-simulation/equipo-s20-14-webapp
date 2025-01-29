package org.project.app.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("API Documentation: Clara").version("1.0"))
                .addServersItem(new Server().url("https://equipo-s20-14-webapp.onrender.com/"));
//                .addServersItem(new Server().url("http://localhost:8080/"));
    }

}