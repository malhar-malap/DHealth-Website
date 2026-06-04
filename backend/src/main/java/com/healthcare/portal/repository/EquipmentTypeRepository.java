package com.healthcare.portal.repository;

import com.healthcare.portal.entity.EquipmentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for EquipmentType entity
 */
@Repository
public interface EquipmentTypeRepository extends JpaRepository<EquipmentType, Long> {
    
    Optional<EquipmentType> findByName(String name);
    
    List<EquipmentType> findByCategory(String category);
    
    List<EquipmentType> findAllByOrderByNameAsc();
}
