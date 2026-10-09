package com.gpwater.repository;

import com.gpwater.entity.Alert;
import com.gpwater.entity.AlertStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByStatus(AlertStatus status);
    List<Alert> findByAssetId(Long assetId);
    long countByStatus(AlertStatus status);
}
