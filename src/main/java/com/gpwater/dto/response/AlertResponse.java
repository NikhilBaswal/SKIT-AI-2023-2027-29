package com.gpwater.dto.response;

import com.gpwater.entity.AlertStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertResponse {
    private Long id;
    private String type;
    private String message;
    private Long assetId;
    private String assetName;
    private AlertStatus status;
    private LocalDateTime createdAt;
}
