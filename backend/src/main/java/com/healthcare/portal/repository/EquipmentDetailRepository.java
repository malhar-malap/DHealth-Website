package com.healthcare.portal.repository;

import com.healthcare.portal.entity.EquipmentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for EquipmentDetail entity
 */
@Repository
public interface EquipmentDetailRepository extends JpaRepository<EquipmentDetail, Long> {
    
    Optional<EquipmentDetail> findByListingId(Long listingId);
    
    void deleteByListingId(Long listingId);
}
