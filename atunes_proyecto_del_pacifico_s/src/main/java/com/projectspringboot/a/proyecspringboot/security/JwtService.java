package com.projectspringboot.a.proyecspringboot.security;


import com.projectspringboot.a.proyecspringboot.entity.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

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

    
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        // La clave secreta debe ser la misma que usaste para generar el token
        // ¡En un proyecto real, guárdala de forma segura!
        String secretString = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
        byte[] keyBytes = Decoders.BASE64.decode(secretString);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}