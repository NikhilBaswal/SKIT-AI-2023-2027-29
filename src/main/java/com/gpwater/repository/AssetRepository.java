package com.gpwater.repository;

import com.gpwater.entity.Asset;
import com.gpwater.entity.AssetStatus;
import com.gpwater.entity.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {

    List<Asset> findByPanchayatId(Long panchayatId);

    List<Asset> findByType(AssetType type);

    List<Asset> findByStatus(AssetStatus status);

    @Query("SELECT a FROM Asset a WHERE a.panchayat.id = :panchayatId AND a.status = :status")
    List<Asset> findByPanchayatAndStatus(@Param("panchayatId") Long panchayatId,
                                          @Param("status") AssetStatus status);

    long countByStatus(AssetStatus status);
}
