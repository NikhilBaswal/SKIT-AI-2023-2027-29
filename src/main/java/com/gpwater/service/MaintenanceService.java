package com.gpwater.service;

import com.gpwater.dto.request.MaintenanceLogRequest;
import com.gpwater.dto.request.MaintenanceScheduleRequest;
import com.gpwater.dto.response.MaintenanceScheduleResponse;
import com.gpwater.entity.*;
import com.gpwater.exception.ResourceNotFoundException;
import com.gpwater.repository.AssetRepository;
import com.gpwater.repository.MaintenanceLogRepository;
import com.gpwater.repository.MaintenanceScheduleRepository;
import com.gpwater.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaintenanceService {

    private final MaintenanceScheduleRepository scheduleRepository;
    private final MaintenanceLogRepository logRepository;
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    private final AlertService alertService;

    @Transactional
    public MaintenanceScheduleResponse createSchedule(MaintenanceScheduleRequest request) {
        Asset asset = assetRepository.findById(request.getAssetId())
                .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", request.getAssetId()));

        MaintenanceSchedule schedule = MaintenanceSchedule.builder()
                .asset(asset)
                .nextDueDate(request.getNextDueDate())
                .frequency(request.getFrequency())
                .taskType(request.getTaskType())
                .build();

        MaintenanceSchedule saved = scheduleRepository.save(schedule);

        // Trigger alert if schedule is already due within 3 days
        if (!saved.getNextDueDate().isAfter(LocalDate.now().plusDays(3))) {
            alertService.createAlert(
                    "MAINTENANCE_DUE",
                    "Maintenance due soon for asset: " + asset.getName(),
                    asset
            );
        }

        return toResponse(saved);
    }

    public List<MaintenanceScheduleResponse> getAllSchedules() {
        return scheduleRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<MaintenanceScheduleResponse> getSchedulesByAsset(Long assetId) {
        return scheduleRepository.findByAssetId(assetId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<MaintenanceScheduleResponse> getOverdueSchedules() {
        return scheduleRepository.findDueOnOrBefore(LocalDate.now())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public void deleteSchedule(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Maintenance schedule", "id", id);
        }
        scheduleRepository.deleteById(id);
    }

    @Transactional
    public MaintenanceLog logCompletedMaintenance(MaintenanceLogRequest request) {
        Asset asset = assetRepository.findById(request.getAssetId())
                .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", request.getAssetId()));

        User performedBy = null;
        if (request.getPerformedById() != null) {
            performedBy = userRepository.findById(request.getPerformedById())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getPerformedById()));
        }

        MaintenanceLog log = MaintenanceLog.builder()
                .asset(asset)
                .performedOn(request.getPerformedOn())
                .description(request.getDescription())
                .cost(request.getCost())
                .performedBy(performedBy)
                .build();

        return logRepository.save(log);
    }

    // Scans all schedules and raises alerts for anything due within 3 days — called daily via scheduler
    @Transactional
    public void runDueDateCheck() {
        List<MaintenanceSchedule> dueSoon = scheduleRepository.findDueBetween(
                LocalDate.now(), LocalDate.now().plusDays(3));

        for (MaintenanceSchedule schedule : dueSoon) {
            alertService.createAlert(
                    "MAINTENANCE_DUE",
                    "Upcoming maintenance for asset: " + schedule.getAsset().getName()
                            + " (due " + schedule.getNextDueDate() + ")",
                    schedule.getAsset()
            );
        }
    }

    private MaintenanceScheduleResponse toResponse(MaintenanceSchedule schedule) {
        return MaintenanceScheduleResponse.builder()
                .id(schedule.getId())
                .assetId(schedule.getAsset().getId())
                .assetName(schedule.getAsset().getName())
                .nextDueDate(schedule.getNextDueDate())
                .frequency(schedule.getFrequency())
                .taskType(schedule.getTaskType())
                .overdue(schedule.getNextDueDate().isBefore(LocalDate.now()))
                .build();
    }
}
