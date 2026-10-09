package com.gpwater.dto.response;

import com.gpwater.entity.AssetStatus;
import com.gpwater.entity.AssetType;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetResponse {
    private Long id;
    private AssetType type;
    private String name;
    private String location;
    private LocalDate installDate;
    private AssetStatus status;
    private Long panchayatId;
    private String panchayatName;
}
