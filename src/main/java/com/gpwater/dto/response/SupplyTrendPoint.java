package com.gpwater.dto.response;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplyTrendPoint {
    private LocalDate date;
    private double averageSupplyHours;
    private long readingsCount;
}
