package com.gpwater.repository;

import com.gpwater.entity.MaintenanceSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MaintenanceScheduleRepository extends JpaRepository<MaintenanceSchedule, Long> {

    List<MaintenanceSchedule> findByAssetId(Long assetId);

    @Query("SELECT m FROM MaintenanceSchedule m WHERE m.nextDueDate <= :date ORDER BY m.nextDueDate")
    List<MaintenanceSchedule> findDueOnOrBefore(@Param("date") LocalDate date);

    @Query("SELECT m FROM MaintenanceSchedule m WHERE m.nextDueDate BETWEEN :start AND :end ORDER BY m.nextDueDate")
    List<MaintenanceSchedule> findDueBetween(@Param("start") LocalDate start, @Param("end") LocalDate end);
}
