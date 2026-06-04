package com.healthcare.portal.repository;

import com.healthcare.portal.entity.PharmaDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for PharmaDetail entity
 */
@Repository
public interface PharmaDetailRepository extends JpaRepository<PharmaDetail, Long> {
    
    Optional<PharmaDetail> findByListingId(Long listingId);
    
    void deleteByListingId(Long listingId);
}
