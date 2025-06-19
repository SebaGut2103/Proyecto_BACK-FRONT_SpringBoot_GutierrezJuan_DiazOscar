package com.projectspringboot.a.proyecspringboot.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Permite CORS en todas las rutas bajo /api/
                .allowedOrigins("http://localhost:5173") // El origen de tu frontend en React
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                .allowedHeaders("*") // Permite todas las cabeceras
                .allowCredentials(true) // Permite el envío de cookies y credenciales de autenticación
                .maxAge(3600); // Tiempo que el navegador puede cachear la respuesta de preflight
    }
}