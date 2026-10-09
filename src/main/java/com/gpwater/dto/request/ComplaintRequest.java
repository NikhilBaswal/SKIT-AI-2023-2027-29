package com.gpwater.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintRequest {

    @NotNull(message = "User id is required")
    private Long raisedById;

    @NotBlank(message = "Description is required")
    private String description;

    private Long assetId;
}
