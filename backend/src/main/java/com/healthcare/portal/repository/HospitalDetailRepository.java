package com.healthcare.portal.repository;

import com.healthcare.portal.entity.HospitalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for HospitalDetail entity
 */
@Repository
public interface HospitalDetailRepository extends JpaRepository<HospitalDetail, Long> {
    
    Optional<HospitalDetail> findByListingId(Long listingId);
    
    void deleteByListingId(Long listingId);
}
