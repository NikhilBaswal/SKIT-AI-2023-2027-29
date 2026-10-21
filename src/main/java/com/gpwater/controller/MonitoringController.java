package com.gpwater.controller;

import com.gpwater.dto.request.MonitoringLogRequest;
import com.gpwater.dto.response.ApiResponse;
import com.gpwater.dto.response.MonitoringLogResponse;
import com.gpwater.service.MonitoringService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/monitoring")
@RequiredArgsConstructor
public class MonitoringController {

    private final MonitoringService monitoringService;

    @PostMapping("/logs")
    public ApiResponse<MonitoringLogResponse> createLog(@Valid @RequestBody MonitoringLogRequest request) {
        return ApiResponse.success("Monitoring log recorded", monitoringService.createLog(request));
    }

    @GetMapping("/logs/asset/{assetId}")
    public ApiResponse<List<MonitoringLogResponse>> getByAsset(@PathVariable Long assetId) {
        return ApiResponse.success("Logs fetched", monitoringService.getLogsByAsset(assetId));
    }

    @GetMapping("/logs/date")
    public ApiResponse<List<MonitoringLogResponse>> getByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ApiResponse.success("Logs fetched", monitoringService.getLogsByDate(date));
    }

    @GetMapping("/logs/asset/{assetId}/range")
    public ApiResponse<List<MonitoringLogResponse>> getByRange(
            @PathVariable Long assetId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ApiResponse.success("Logs fetched", monitoringService.getLogsByAssetAndRange(assetId, start, end));
    }

    @GetMapping("/logs/asset/{assetId}/average-supply")
    public ApiResponse<Double> getAverageSupply(@PathVariable Long assetId) {
        return ApiResponse.success("Average supply hours", monitoringService.getAverageSupplyHours(assetId));
    }

    @DeleteMapping("/logs/{id}")
    public ApiResponse<Void> deleteLog(@PathVariable Long id) {
        monitoringService.deleteLog(id);
        return ApiResponse.success("Log deleted", null);
    }
}
