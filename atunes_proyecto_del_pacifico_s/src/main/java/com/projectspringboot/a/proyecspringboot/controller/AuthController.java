package com.projectspringboot.a.proyecspringboot.controller;



import com.projectspringboot.a.proyecspringboot.dto.AuthRequestDTO;
import com.projectspringboot.a.proyecspringboot.dto.AuthResponseDTO;
<<<<<<< HEAD
import com.projectspringboot.a.proyecspringboot.entity.Usuario;
import com.projectspringboot.a.proyecspringboot.repository.UsuarioRepository;
import com.projectspringboot.a.proyecspringboot.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
=======
// import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> 3acb7991ef44245c75ac298f0915759d335025b8
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepository; // Para buscar el usuario completo

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequest) {
        // 1. Autenticar al usuario con el manager de Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getNombreUsuario(), authRequest.getContrasena())
        );

        // Si la autenticación es exitosa, Spring Security tiene el contexto del usuario
        // 2. Buscamos el usuario completo para pasarlo al generador de tokens
        Usuario usuario = usuarioRepository.findByNombreUsuario(authRequest.getNombreUsuario())
                .orElseThrow(() -> new UsernameNotFoundException("Error al generar el token, usuario no encontrado."));

        // 3. Generamos el token JWT real
        String token = jwtService.generateToken(usuario);

        return ResponseEntity.ok(new AuthResponseDTO(token));
    }
}