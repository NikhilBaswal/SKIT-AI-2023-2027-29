package com.gpwater.service;

import com.gpwater.dto.request.MonitoringLogRequest;
import com.gpwater.dto.response.MonitoringLogResponse;
import com.gpwater.entity.Asset;
import com.gpwater.entity.DailyMonitoringLog;
import com.gpwater.entity.User;
import com.gpwater.exception.ResourceNotFoundException;
import com.gpwater.repository.AssetRepository;
import com.gpwater.repository.DailyMonitoringLogRepository;
import com.gpwater.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MonitoringService {

    private static final double MIN_SAFE_PH = 6.5;
    private static final double MAX_SAFE_PH = 8.5;
    private static final double MAX_SAFE_TDS = 500.0;
    private static final double MIN_EXPECTED_SUPPLY_HOURS = 2.0;

    private final DailyMonitoringLogRepository logRepository;
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;

    @Transactional
    public MonitoringLogResponse createLog(MonitoringLogRequest request) {
        Asset asset = assetRepository.findById(request.getAssetId())
                .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", request.getAssetId()));

        User recordedBy = null;
        if (request.getRecordedById() != null) {
            recordedBy = userRepository.findById(request.getRecordedById())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getRecordedById()));
        }

        DailyMonitoringLog log = DailyMonitoringLog.builder()
                .asset(asset)
                .logDate(request.getLogDate())
                .supplyHours(request.getSupplyHours())
                .pressure(request.getPressure())
                .phValue(request.getPhValue())
                .tdsValue(request.getTdsValue())
                .recordedBy(recordedBy)
                .build();

        DailyMonitoringLog saved = logRepository.save(log);
        return toResponse(saved);
    }

    public List<MonitoringLogResponse> getLogsByAsset(Long assetId) {
        return logRepository.findByAssetId(assetId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<MonitoringLogResponse> getLogsByDate(LocalDate date) {
        return logRepository.findAllByDate(date)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<MonitoringLogResponse> getLogsByAssetAndRange(Long assetId, LocalDate start, LocalDate end) {
        return logRepository.findByAssetAndDateRange(assetId, start, end)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public Double getAverageSupplyHours(Long assetId) {
        Double avg = logRepository.findAverageSupplyHours(assetId);
        return avg != null ? avg : 0.0;
    }

    @Transactional
    public void deleteLog(Long id) {
        if (!logRepository.existsById(id)) {
            throw new ResourceNotFoundException("Monitoring log", "id", id);
        }
        logRepository.deleteById(id);
    }

    // Simple threshold-based anomaly detection
    private String detectAnomaly(DailyMonitoringLog log) {
        StringBuilder reason = new StringBuilder();

        if (log.getPhValue() != null && (log.getPhValue() < MIN_SAFE_PH || log.getPhValue() > MAX_SAFE_PH)) {
            reason.append("pH out of safe range (").append(log.getPhValue()).append("). ");
        }
        if (log.getTdsValue() != null && log.getTdsValue() > MAX_SAFE_TDS) {
            reason.append("TDS above safe limit (").append(log.getTdsValue()).append("). ");
        }
        if (log.getSupplyHours() != null && log.getSupplyHours() < MIN_EXPECTED_SUPPLY_HOURS) {
            reason.append("Supply hours below expected minimum. ");
        }

        return reason.toString().trim();
    }

    private MonitoringLogResponse toResponse(DailyMonitoringLog log) {
        String anomalyReason = detectAnomaly(log);
        return MonitoringLogResponse.builder()
                .id(log.getId())
                .assetId(log.getAsset().getId())
                .assetName(log.getAsset().getName())
                .logDate(log.getLogDate())
                .supplyHours(log.getSupplyHours())
                .pressure(log.getPressure())
                .phValue(log.getPhValue())
                .tdsValue(log.getTdsValue())
                .recordedByName(log.getRecordedBy() != null ? log.getRecordedBy().getName() : null)
                .anomaly(!anomalyReason.isEmpty())
                .anomalyReason(anomalyReason.isEmpty() ? null : anomalyReason)
                .build();
    }
}
