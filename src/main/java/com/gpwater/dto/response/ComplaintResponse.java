package com.gpwater.dto.response;

import com.gpwater.entity.ComplaintStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintResponse {
    private Long id;
    private String description;
    private ComplaintStatus status;
    private Long assetId;
    private String assetName;
    private String raisedByName;
    private LocalDateTime createdAt;
}
