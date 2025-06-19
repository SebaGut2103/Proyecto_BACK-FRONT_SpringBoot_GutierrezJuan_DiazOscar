package com.projectspringboot.a.proyecspringboot.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Habilita la seguridad a nivel de método (para @PreAuthorize)
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Bean del AuthenticationManager, necesario para el proceso de login
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Habilitar CORS usando la configuración global que ya creamos
                .cors(withDefaults())
                
                // 2. Deshabilitar CSRF porque usamos JWT (no hay sesiones)
                .csrf(csrf -> csrf.disable())
                
                // 3. Definir las reglas de autorización de las peticiones
                .authorizeHttpRequests(auth -> auth
                        // a. Permitir TODAS las peticiones OPTIONS (para las pre-flight de CORS)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        
                        // b. Permitir el acceso público al endpoint de login
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        
                        // c. Requerir autenticación para todas las demás peticiones
                        .anyRequest().authenticated()
                )
                
                // 4. Establecer la política de gestión de sesiones como STATELESS (sin estado)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Aquí, más adelante, añadirás el filtro de JWT
        // http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    
    // Opcional: Puedes mantener la configuración de CORS aquí en lugar de en un WebConfig separado
    // si lo prefieres. Ambas formas funcionan, pero esta es más autocontenida.
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}