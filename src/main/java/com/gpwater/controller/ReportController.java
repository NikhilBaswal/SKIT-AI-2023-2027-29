package com.gpwater.controller;

import com.gpwater.dto.response.ApiResponse;
import com.gpwater.dto.response.ComplaintStatusCount;
import com.gpwater.dto.response.DashboardSummaryResponse;
import com.gpwater.dto.response.SupplyTrendPoint;
import com.gpwater.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/summary")
    public ApiResponse<DashboardSummaryResponse> getSummary() {
        return ApiResponse.success("Dashboard summary fetched", reportService.getDashboardSummary());
    }

    @GetMapping("/supply-trend")
    public ApiResponse<List<SupplyTrendPoint>> getSupplyTrend(
            @RequestParam(defaultValue = "7") int days) {
        return ApiResponse.success("Supply trend fetched", reportService.getSupplyTrend(days));
    }

    @GetMapping("/complaint-stats")
    public ApiResponse<List<ComplaintStatusCount>> getComplaintStats() {
        return ApiResponse.success("Complaint status breakdown fetched", reportService.getComplaintStatusBreakdown());
    }
}
