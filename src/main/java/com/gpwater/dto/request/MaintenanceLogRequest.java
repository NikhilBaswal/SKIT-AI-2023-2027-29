package com.gpwater.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceLogRequest {

    @NotNull(message = "Asset id is required")
    private Long assetId;

    @NotNull(message = "Performed on date is required")
    private LocalDate performedOn;

    private String description;

    private Double cost;

    private Long performedById;
}
