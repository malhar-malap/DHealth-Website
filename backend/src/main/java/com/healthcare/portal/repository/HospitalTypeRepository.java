package com.healthcare.portal.repository;

import com.healthcare.portal.entity.HospitalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for HospitalType entity
 */
@Repository
public interface HospitalTypeRepository extends JpaRepository<HospitalType, Long> {
    
    Optional<HospitalType> findByName(String name);
    
    List<HospitalType> findAllByOrderByNameAsc();
}
