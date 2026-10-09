package com.gpwater.dto.response;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonitoringLogResponse {
    private Long id;
    private Long assetId;
    private String assetName;
    private LocalDate logDate;
    private Double supplyHours;
    private Double pressure;
    private Double phValue;
    private Double tdsValue;
    private String recordedByName;
    private boolean anomaly;
    private String anomalyReason;
}
