package org.project.app.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Documentation: Clara")
                        .version("1.0")
                        .description("Documentación de la API de gestión Gastos personales")
                )
                .addServersItem(new Server().url("https://equipo-s20-14-webapp.onrender.com/")) // Configuración de servidor
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth")) // Configuración de seguridad
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                );
    }
//    .addServersItem(new Server().url("http://localhost:8080/"))
//    .addServersItem(new Server().url("https://equipo-s20-14-webapp.onrender.com/"));
}
