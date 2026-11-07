package com.gpwater.dto.response;

import com.gpwater.entity.ComplaintStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintStatusCount {
    private ComplaintStatus status;
    private long count;
}
