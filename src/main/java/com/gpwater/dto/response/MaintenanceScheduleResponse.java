package com.gpwater.dto.response;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceScheduleResponse {
    private Long id;
    private Long assetId;
    private String assetName;
    private LocalDate nextDueDate;
    private String frequency;
    private String taskType;
    private boolean overdue;
}
