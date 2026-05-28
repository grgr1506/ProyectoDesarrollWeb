package com.helpdesk.controller;

import com.helpdesk.dto.JwtResponseDTO;
import com.helpdesk.dto.LoginDTO;
import com.helpdesk.dto.UsuarioDTO;
import com.helpdesk.entity.Usuario;
import com.helpdesk.security.JwtUtil;
import com.helpdesk.security.UserDetailsImpl;
import com.helpdesk.security.UserDetailsServiceImpl;
import com.helpdesk.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioService usuarioService,
                          AuthenticationManager authenticationManager,
                          UserDetailsServiceImpl userDetailsService,
                          JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UsuarioDTO dto) {
        Usuario usuario = usuarioService.registrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Usuario registrado correctamente con ID: " + usuario.getId());
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> login(@Valid @RequestBody LoginDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getCorreo(), dto.getPassword()));

        UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(dto.getCorreo());
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponseDTO(
                token,
                "Bearer",
                userDetails.getRol().name(),
                userDetails.getId(),
                userDetails.getNombre()
        ));
    }
}
