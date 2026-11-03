package com.gpwater.controller;

import com.gpwater.dto.response.AlertResponse;
import com.gpwater.dto.response.ApiResponse;
import com.gpwater.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    @GetMapping
    public ApiResponse<List<AlertResponse>> getAll() {
        return ApiResponse.success("Alerts fetched", alertService.getAllAlerts());
    }

    @GetMapping("/unread")
    public ApiResponse<List<AlertResponse>> getUnread() {
        return ApiResponse.success("Unread alerts fetched", alertService.getUnreadAlerts());
    }

    @PatchMapping("/{id}/read")
    public ApiResponse<AlertResponse> markAsRead(@PathVariable Long id) {
        return ApiResponse.success("Alert marked as read", alertService.markAsRead(id));
    }

    @PatchMapping("/{id}/resolve")
    public ApiResponse<AlertResponse> resolve(@PathVariable Long id) {
        return ApiResponse.success("Alert resolved", alertService.resolve(id));
    }
}
