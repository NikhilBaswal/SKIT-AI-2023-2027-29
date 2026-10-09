package com.gpwater.controller;

import com.gpwater.dto.request.AssetRequest;
import com.gpwater.dto.response.ApiResponse;
import com.gpwater.dto.response.AssetResponse;
import com.gpwater.entity.AssetStatus;
import com.gpwater.service.AssetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @PostMapping
    public ApiResponse<AssetResponse> create(@Valid @RequestBody AssetRequest request) {
        return ApiResponse.success("Asset created successfully", assetService.createAsset(request));
    }

    @GetMapping
    public ApiResponse<List<AssetResponse>> getAll() {
        return ApiResponse.success("Assets fetched", assetService.getAllAssets());
    }

    @GetMapping("/{id}")
    public ApiResponse<AssetResponse> getById(@PathVariable Long id) {
        return ApiResponse.success("Asset fetched", assetService.getAssetById(id));
    }

    @GetMapping("/panchayat/{panchayatId}")
    public ApiResponse<List<AssetResponse>> getByPanchayat(@PathVariable Long panchayatId) {
        return ApiResponse.success("Assets fetched", assetService.getAssetsByPanchayat(panchayatId));
    }

    @PutMapping("/{id}")
    public ApiResponse<AssetResponse> update(@PathVariable Long id, @Valid @RequestBody AssetRequest request) {
        return ApiResponse.success("Asset updated", assetService.updateAsset(id, request));
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<AssetResponse> updateStatus(@PathVariable Long id, @RequestParam AssetStatus status) {
        return ApiResponse.success("Asset status updated", assetService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        assetService.deleteAsset(id);
    }
}
