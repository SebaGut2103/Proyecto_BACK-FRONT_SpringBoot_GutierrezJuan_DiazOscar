package com.projectspringboot.a.proyecspringboot.security;


import com.projectspringboot.a.proyecspringboot.entity.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    // Genera una clave segura para HS256. ¡En un proyecto real, esta clave debe
    // guardarse de forma segura y no estar hardcodeada!
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(Usuario usuario) {
        Map<String, Object> claims = new HashMap<>();
        // Puedes añadir claims personalizados aquí
        claims.put("rol", usuario.getRol().getNombre());
        claims.put("nombreUsuario", usuario.getNombreUsuario());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.getNombreUsuario())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas de validez
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
}