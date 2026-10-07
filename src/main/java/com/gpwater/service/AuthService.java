package com.gpwater.service;

import com.gpwater.dto.request.LoginRequest;
import com.gpwater.dto.request.RegisterRequest;
import com.gpwater.dto.response.AuthResponse;
import com.gpwater.entity.*;
import com.gpwater.exception.BadRequestException;
import com.gpwater.exception.ResourceNotFoundException;
import com.gpwater.repository.PanchayatRepository;
import com.gpwater.repository.RoleRepository;
import com.gpwater.repository.UserRepository;
import com.gpwater.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PanchayatRepository panchayatRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        Role role = roleRepository.findByName(RoleName.valueOf(request.getRole().toUpperCase()))
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", request.getRole()));

        Panchayat panchayat = null;
        if (request.getPanchayatId() != null) {
            panchayat = panchayatRepository.findById(request.getPanchayatId())
                    .orElseThrow(() -> new ResourceNotFoundException("Panchayat", "id", request.getPanchayatId()));
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .mobileNumber(request.getMobileNumber())
                .role(role)
                .panchayat(panchayat)
                .active(true)
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), role.getName().name());
        return AuthResponse.builder().token(token).email(user.getEmail()).role(role.getName().name()).build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().getName().name());
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole().getName().name())
                .build();
    }
}
