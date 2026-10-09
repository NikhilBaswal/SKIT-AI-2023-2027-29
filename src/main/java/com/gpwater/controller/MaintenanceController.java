package com.gpwater.controller;

import com.gpwater.dto.request.MaintenanceLogRequest;
import com.gpwater.dto.request.MaintenanceScheduleRequest;
import com.gpwater.dto.response.ApiResponse;
import com.gpwater.dto.response.MaintenanceScheduleResponse;
import com.gpwater.entity.MaintenanceLog;
import com.gpwater.service.MaintenanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@RequiredArgsConstructor
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    @PostMapping("/schedules")
    public ApiResponse<MaintenanceScheduleResponse> createSchedule(@Valid @RequestBody MaintenanceScheduleRequest request) {
        return ApiResponse.success("Maintenance scheduled", maintenanceService.createSchedule(request));
    }

    @GetMapping("/schedules")
    public ApiResponse<List<MaintenanceScheduleResponse>> getAll() {
        return ApiResponse.success("Schedules fetched", maintenanceService.getAllSchedules());
    }

    @GetMapping("/schedules/asset/{assetId}")
    public ApiResponse<List<MaintenanceScheduleResponse>> getByAsset(@PathVariable Long assetId) {
        return ApiResponse.success("Schedules fetched", maintenanceService.getSchedulesByAsset(assetId));
    }

    @GetMapping("/schedules/overdue")
    public ApiResponse<List<MaintenanceScheduleResponse>> getOverdue() {
        return ApiResponse.success("Overdue schedules fetched", maintenanceService.getOverdueSchedules());
    }

    @DeleteMapping("/schedules/{id}")
    public ApiResponse<Void> deleteSchedule(@PathVariable Long id) {
        maintenanceService.deleteSchedule(id);
        return ApiResponse.success("Schedule deleted", null);
    }

    @PostMapping("/logs")
    public ApiResponse<MaintenanceLog> logMaintenance(@Valid @RequestBody MaintenanceLogRequest request) {
        return ApiResponse.success("Maintenance logged", maintenanceService.logCompletedMaintenance(request));
    }
}
