package com.healthcare.portal.repository;

import com.healthcare.portal.entity.ContactMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for ContactMessage entity
 */
@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    
    Page<ContactMessage> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    Page<ContactMessage> findByStatusOrderByCreatedAtDesc(ContactMessage.ContactMessageStatus status, Pageable pageable);
    
    long countByStatus(ContactMessage.ContactMessageStatus status);
}
