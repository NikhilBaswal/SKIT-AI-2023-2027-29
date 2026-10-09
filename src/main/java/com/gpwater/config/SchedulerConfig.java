package com.gpwater.config;

import com.gpwater.service.MaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class SchedulerConfig {

    private final MaintenanceService maintenanceService;

    // Runs once every day at 7 AM to check for upcoming maintenance
    @Scheduled(cron = "0 0 7 * * *")
    public void checkMaintenanceDueDates() {
        maintenanceService.runDueDateCheck();
    }
}
