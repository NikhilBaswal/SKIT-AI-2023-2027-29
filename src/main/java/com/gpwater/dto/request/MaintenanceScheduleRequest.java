package com.gpwater.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceScheduleRequest {

    @NotNull(message = "Asset id is required")
    private Long assetId;

    @NotNull(message = "Next due date is required")
    private LocalDate nextDueDate;

    @NotBlank(message = "Frequency is required")
    private String frequency;

    @NotBlank(message = "Task type is required")
    private String taskType;
}
