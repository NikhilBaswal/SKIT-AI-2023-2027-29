package com.gpwater.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthCheckController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> check() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "gp-water-om-backend",
                "timestamp", LocalDateTime.now().toString()
        ));
    }
}
