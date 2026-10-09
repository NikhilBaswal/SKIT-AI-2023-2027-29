package com.gpwater.service;

import com.gpwater.dto.response.AlertResponse;
import com.gpwater.entity.Alert;
import com.gpwater.entity.AlertStatus;
import com.gpwater.entity.Asset;
import com.gpwater.exception.ResourceNotFoundException;
import com.gpwater.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository alertRepository;

    @Transactional
    public Alert createAlert(String type, String message, Asset asset) {
        Alert alert = Alert.builder()
                .type(type)
                .message(message)
                .asset(asset)
                .status(AlertStatus.UNREAD)
                .build();
        return alertRepository.save(alert);
    }

    public List<AlertResponse> getAllAlerts() {
        return alertRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<AlertResponse> getUnreadAlerts() {
        return alertRepository.findByStatus(AlertStatus.UNREAD)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public AlertResponse markAsRead(Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert", "id", id));
        alert.setStatus(AlertStatus.READ);
        return toResponse(alertRepository.save(alert));
    }

    @Transactional
    public AlertResponse resolve(Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert", "id", id));
        alert.setStatus(AlertStatus.RESOLVED);
        return toResponse(alertRepository.save(alert));
    }

    private AlertResponse toResponse(Alert alert) {
        return AlertResponse.builder()
                .id(alert.getId())
                .type(alert.getType())
                .message(alert.getMessage())
                .assetId(alert.getAsset() != null ? alert.getAsset().getId() : null)
                .assetName(alert.getAsset() != null ? alert.getAsset().getName() : null)
                .status(alert.getStatus())
                .createdAt(alert.getCreatedAt())
                .build();
    }
}
