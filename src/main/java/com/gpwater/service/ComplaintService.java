package com.gpwater.service;

import com.gpwater.dto.request.ComplaintRequest;
import com.gpwater.dto.response.ComplaintResponse;
import com.gpwater.entity.Asset;
import com.gpwater.entity.Complaint;
import com.gpwater.entity.ComplaintStatus;
import com.gpwater.entity.User;
import com.gpwater.exception.ResourceNotFoundException;
import com.gpwater.repository.AssetRepository;
import com.gpwater.repository.ComplaintRepository;
import com.gpwater.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final AssetRepository assetRepository;

    @Transactional
    public ComplaintResponse createComplaint(ComplaintRequest request) {
        User raisedBy = userRepository.findById(request.getRaisedById())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getRaisedById()));

        Asset asset = null;
        if (request.getAssetId() != null) {
            asset = assetRepository.findById(request.getAssetId())
                    .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", request.getAssetId()));
        }

        Complaint complaint = Complaint.builder()
                .raisedBy(raisedBy)
                .description(request.getDescription())
                .asset(asset)
                .status(ComplaintStatus.OPEN)
                .build();

        Complaint saved = complaintRepository.save(complaint);
        return toResponse(saved);
    }

    public List<ComplaintResponse> getAllComplaints() {
        return complaintRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ComplaintResponse> getByStatus(ComplaintStatus status) {
        return complaintRepository.findByStatus(status).stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public ComplaintResponse updateStatus(Long id, ComplaintStatus status) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint", "id", id));
        complaint.setStatus(status);
        return toResponse(complaintRepository.save(complaint));
    }

    @Transactional
    public void deleteComplaint(Long id) {
        if (!complaintRepository.existsById(id)) {
            throw new ResourceNotFoundException("Complaint", "id", id);
        }
        complaintRepository.deleteById(id);
    }

    private ComplaintResponse toResponse(Complaint complaint) {
        return ComplaintResponse.builder()
                .id(complaint.getId())
                .description(complaint.getDescription())
                .status(complaint.getStatus())
                .assetId(complaint.getAsset() != null ? complaint.getAsset().getId() : null)
                .assetName(complaint.getAsset() != null ? complaint.getAsset().getName() : null)
                .raisedByName(complaint.getRaisedBy().getName())
                .createdAt(complaint.getCreatedAt())
                .build();
    }
}
