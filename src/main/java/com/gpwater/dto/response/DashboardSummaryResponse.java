package com.gpwater.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryResponse {
    private long totalAssets;
    private long activeAssets;
    private long totalComplaints;
    private long openComplaints;
    private long unreadAlerts;
    private long upcomingMaintenanceCount;
}
