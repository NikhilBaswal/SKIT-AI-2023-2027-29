package com.gpwater.service;

import com.gpwater.dto.request.AssetRequest;
import com.gpwater.dto.response.AssetResponse;
import com.gpwater.entity.Asset;
import com.gpwater.entity.AssetStatus;
import com.gpwater.entity.Panchayat;
import com.gpwater.exception.ResourceNotFoundException;
import com.gpwater.repository.AssetRepository;
import com.gpwater.repository.PanchayatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepository assetRepository;
    private final PanchayatRepository panchayatRepository;

    @Transactional
    public AssetResponse createAsset(AssetRequest request) {
        Panchayat panchayat = panchayatRepository.findById(request.getPanchayatId())
                .orElseThrow(() -> new ResourceNotFoundException("Panchayat", "id", request.getPanchayatId()));

        Asset asset = Asset.builder()
                .type(request.getType())
                .name(request.getName())
                .location(request.getLocation())
                .installDate(request.getInstallDate())
                .status(request.getStatus() != null ? request.getStatus() : AssetStatus.ACTIVE)
                .panchayat(panchayat)
                .build();

        Asset saved = assetRepository.save(asset);
        return toResponse(saved);
    }

    public List<AssetResponse> getAllAssets() {
        return assetRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AssetResponse getAssetById(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", id));
        return toResponse(asset);
    }

    public List<AssetResponse> getAssetsByPanchayat(Long panchayatId) {
        return assetRepository.findByPanchayatId(panchayatId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public AssetResponse updateAsset(Long id, AssetRequest request) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", id));

        asset.setType(request.getType());
        asset.setName(request.getName());
        asset.setLocation(request.getLocation());
        asset.setInstallDate(request.getInstallDate());
        if (request.getStatus() != null) {
            asset.setStatus(request.getStatus());
        }

        Asset updated = assetRepository.save(asset);
        return toResponse(updated);
    }

    @Transactional
    public void deleteAsset(Long id) {
        if (!assetRepository.existsById(id)) {
            throw new ResourceNotFoundException("Asset", "id", id);
        }
        assetRepository.deleteById(id);
    }

    @Transactional
    public AssetResponse updateStatus(Long id, AssetStatus status) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", id));
        asset.setStatus(status);
        return toResponse(assetRepository.save(asset));
    }

    private AssetResponse toResponse(Asset asset) {
        return AssetResponse.builder()
                .id(asset.getId())
                .type(asset.getType())
                .name(asset.getName())
                .location(asset.getLocation())
                .installDate(asset.getInstallDate())
                .status(asset.getStatus())
                .panchayatId(asset.getPanchayat() != null ? asset.getPanchayat().getId() : null)
                .panchayatName(asset.getPanchayat() != null ? asset.getPanchayat().getName() : null)
                .build();
    }
}
