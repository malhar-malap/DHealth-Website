package com.healthcare.portal.service;

import com.healthcare.portal.entity.AuditLog;
import com.healthcare.portal.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    /**
     * Saves an audit log asynchronously to avoid blocking the main request thread.
     */
    public void saveLogAsync(AuditLog log) {
        CompletableFuture.runAsync(() -> {
            try {
                auditLogRepository.save(log);
            } catch (Exception e) {
                // Ignore audit log save errors to prevent interrupting user flow,
                // but log to standard error/logger
                System.err.println("Failed to save audit log: " + e.getMessage());
            }
        });
    }

    public Page<AuditLog> getAuditLogs(Long userId, String action, Pageable pageable) {
        if (userId != null && action != null && !action.isEmpty()) {
            return auditLogRepository.findByUserIdAndActionContainingIgnoreCase(userId, action, pageable);
        } else if (userId != null) {
            return auditLogRepository.findByUserId(userId, pageable);
        } else if (action != null && !action.isEmpty()) {
            return auditLogRepository.findByActionContainingIgnoreCase(action, pageable);
        }
        return auditLogRepository.findAll(pageable);
    }
}
