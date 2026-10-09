package com.gpwater.dto.request;

import com.gpwater.entity.AssetStatus;
import com.gpwater.entity.AssetType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetRequest {

    @NotNull(message = "Asset type is required")
    private AssetType type;

    @NotBlank(message = "Asset name is required")
    private String name;

    private String location;

    private LocalDate installDate;

    private AssetStatus status;

    @NotNull(message = "Panchayat id is required")
    private Long panchayatId;
}
