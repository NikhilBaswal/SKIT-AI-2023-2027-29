package com.gpwater.repository;

import com.gpwater.entity.Complaint;
import com.gpwater.entity.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStatus(ComplaintStatus status);
    List<Complaint> findByRaisedById(Long userId);
    long countByStatus(ComplaintStatus status);
}
