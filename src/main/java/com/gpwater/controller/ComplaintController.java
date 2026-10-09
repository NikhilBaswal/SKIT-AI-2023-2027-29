package com.gpwater.controller;

import com.gpwater.dto.request.ComplaintRequest;
import com.gpwater.dto.response.ApiResponse;
import com.gpwater.dto.response.ComplaintResponse;
import com.gpwater.entity.ComplaintStatus;
import com.gpwater.service.ComplaintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping
    public ApiResponse<ComplaintResponse> create(@Valid @RequestBody ComplaintRequest request) {
        return ApiResponse.success("Complaint raised", complaintService.createComplaint(request));
    }

    @GetMapping
    public ApiResponse<List<ComplaintResponse>> getAll() {
        return ApiResponse.success("Complaints fetched", complaintService.getAllComplaints());
    }

    @GetMapping("/status/{status}")
    public ApiResponse<List<ComplaintResponse>> getByStatus(@PathVariable ComplaintStatus status) {
        return ApiResponse.success("Complaints fetched", complaintService.getByStatus(status));
    }

    @PutMapping("/{id}/status")
    public ApiResponse<ComplaintResponse> updateStatus(@PathVariable Long id, @RequestParam ComplaintStatus status) {
        return ApiResponse.success("Complaint status updated", complaintService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return ApiResponse.success("Complaint deleted", null);
    }
}
