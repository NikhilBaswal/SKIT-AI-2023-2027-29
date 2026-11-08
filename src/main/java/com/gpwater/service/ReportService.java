package com.gpwater.service;

import com.gpwater.dto.response.ComplaintStatusCount;
import com.gpwater.dto.response.DashboardSummaryResponse;
import com.gpwater.dto.response.SupplyTrendPoint;
import com.gpwater.entity.AlertStatus;
import com.gpwater.entity.AssetStatus;
import com.gpwater.entity.ComplaintStatus;
import com.gpwater.entity.DailyMonitoringLog;
import com.gpwater.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final AssetRepository assetRepository;
    private final ComplaintRepository complaintRepository;
    private final AlertRepository alertRepository;
    private final MaintenanceScheduleRepository maintenanceScheduleRepository;
    private final DailyMonitoringLogRepository monitoringLogRepository;

    public DashboardSummaryResponse getDashboardSummary() {
        long totalAssets = assetRepository.count();
        long activeAssets = assetRepository.countByStatus(AssetStatus.ACTIVE);
        long totalComplaints = complaintRepository.count();
        long openComplaints = complaintRepository.countByStatus(ComplaintStatus.OPEN);
        long unreadAlerts = alertRepository.countByStatus(AlertStatus.UNREAD);
        long upcomingMaintenance = maintenanceScheduleRepository
                .findDueBetween(LocalDate.now(), LocalDate.now().plusDays(7))
                .size();

        return DashboardSummaryResponse.builder()
                .totalAssets(totalAssets)
                .activeAssets(activeAssets)
                .totalComplaints(totalComplaints)
                .openComplaints(openComplaints)
                .unreadAlerts(unreadAlerts)
                .upcomingMaintenanceCount(upcomingMaintenance)
                .build();
    }

    public List<SupplyTrendPoint> getSupplyTrend(int days) {
        if (days < 1) {
            throw new IllegalArgumentException("days must be at least 1");
        }
        LocalDate fromDate = LocalDate.now().minusDays(days - 1L);
        List<DailyMonitoringLog> logs = monitoringLogRepository.findByLogDateGreaterThanEqual(fromDate);

        Map<LocalDate, List<DailyMonitoringLog>> grouped = logs.stream()
                .collect(Collectors.groupingBy(DailyMonitoringLog::getLogDate));

        List<SupplyTrendPoint> trend = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            LocalDate date = fromDate.plusDays(i);
            List<DailyMonitoringLog> dayLogs = grouped.getOrDefault(date, Collections.emptyList());

            double avg = dayLogs.stream()
                    .filter(log -> log.getSupplyHours() != null)
                    .mapToDouble(DailyMonitoringLog::getSupplyHours)
                    .average()
                    .orElse(0.0);

            trend.add(SupplyTrendPoint.builder()
                    .date(date)
                    .averageSupplyHours(Math.round(avg * 100.0) / 100.0)
                    .readingsCount(dayLogs.size())
                    .build());
        }
        return trend;
    }

    public List<ComplaintStatusCount> getComplaintStatusBreakdown() {
        List<ComplaintStatusCount> breakdown = new ArrayList<>();
        for (ComplaintStatus status : ComplaintStatus.values()) {
            breakdown.add(ComplaintStatusCount.builder()
                    .status(status)
                    .count(complaintRepository.countByStatus(status))
                    .build());
        }
        return breakdown;
    }
}
