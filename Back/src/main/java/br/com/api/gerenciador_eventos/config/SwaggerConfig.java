package br.com.api.gerenciador_eventos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import java.util.Collections;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("br.com.api.gerenciador_eventos.controller"))
                .paths(PathSelectors.ant("/api/**"))
                .build()
                .apiInfo(new ApiInfoBuilder().title("API Gerenciador de Eventos")
                        .description("API para gerenciamento de eventos")
                        .version("1.0.0")
                        .build())
                .securitySchemes(Collections.singletonList(new ApiKey("JWT", "Authorization", "header")));
    }
}