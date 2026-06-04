package com.healthcare.portal.repository;

import com.healthcare.portal.entity.PharmacyDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PharmacyDetailRepository extends JpaRepository<PharmacyDetail, Long> {
    Optional<PharmacyDetail> findByListingId(Long listingId);
}
