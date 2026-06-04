package com.healthcare.portal.repository;

import com.healthcare.portal.entity.DiagnosticDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for DiagnosticDetail entity
 */
@Repository
public interface DiagnosticDetailRepository extends JpaRepository<DiagnosticDetail, Long> {
    
    Optional<DiagnosticDetail> findByListingId(Long listingId);
    
    void deleteByListingId(Long listingId);
}
