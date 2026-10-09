package com.gpwater.repository;

import com.gpwater.entity.DailyMonitoringLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DailyMonitoringLogRepository extends JpaRepository<DailyMonitoringLog, Long> {

    List<DailyMonitoringLog> findByAssetId(Long assetId);

    List<DailyMonitoringLog> findByLogDate(LocalDate logDate);

    @Query("SELECT d FROM DailyMonitoringLog d WHERE d.asset.id = :assetId AND d.logDate BETWEEN :startDate AND :endDate ORDER BY d.logDate")
    List<DailyMonitoringLog> findByAssetAndDateRange(@Param("assetId") Long assetId,
                                                       @Param("startDate") LocalDate startDate,
                                                       @Param("endDate") LocalDate endDate);

    @Query("SELECT d FROM DailyMonitoringLog d WHERE d.logDate = :logDate ORDER BY d.asset.id")
    List<DailyMonitoringLog> findAllByDate(@Param("logDate") LocalDate logDate);

    @Query("SELECT AVG(d.supplyHours) FROM DailyMonitoringLog d WHERE d.asset.id = :assetId")
    Double findAverageSupplyHours(@Param("assetId") Long assetId);
}
