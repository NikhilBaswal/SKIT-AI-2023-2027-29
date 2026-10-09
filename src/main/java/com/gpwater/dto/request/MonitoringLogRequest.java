package com.gpwater.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.DecimalMax;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonitoringLogRequest {

    @NotNull(message = "Asset id is required")
    private Long assetId;

    @NotNull(message = "Log date is required")
    private LocalDate logDate;

    @DecimalMin(value = "0.0", message = "Supply hours cannot be negative")
    @DecimalMax(value = "24.0", message = "Supply hours cannot exceed 24")
    private Double supplyHours;

    @DecimalMin(value = "0.0", message = "Pressure cannot be negative")
    private Double pressure;

    @DecimalMin(value = "0.0", message = "pH cannot be negative")
    @DecimalMax(value = "14.0", message = "pH cannot exceed 14")
    private Double phValue;

    @DecimalMin(value = "0.0", message = "TDS cannot be negative")
    private Double tdsValue;

    private Long recordedById;
}
