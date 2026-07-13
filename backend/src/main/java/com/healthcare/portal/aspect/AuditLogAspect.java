package com.healthcare.portal.aspect;

import com.healthcare.portal.annotation.LogActivity;
import com.healthcare.portal.entity.AuditLog;
import com.healthcare.portal.entity.User;
import com.healthcare.portal.repository.UserRepository;
import com.healthcare.portal.service.AuditLogService;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

@Aspect
@Component
public class AuditLogAspect {

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private UserRepository userRepository;

    @AfterReturning(pointcut = "@annotation(logActivity)", returning = "result")
    public void logActivity(JoinPoint joinPoint, LogActivity logActivity, Object result) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
                return;
            }

            String email = authentication.getName();
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (!userOpt.isPresent()) {
                return;
            }
            Long userId = userOpt.get().getId();

            AuditLog log = new AuditLog();
            log.setUserId(userId);
            log.setAction(logActivity.action());
            log.setEntityType(logActivity.entityType());

            // Try to extract entity ID from method arguments if possible, or just log basic details
            // For simplicity, we just save the action.
            log.setDetails("Method: " + joinPoint.getSignature().getName());

            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            if (request != null) {
                String ipAddress = request.getHeader("X-Forwarded-For");
                if (ipAddress == null || ipAddress.isEmpty()) {
                    ipAddress = request.getRemoteAddr();
                }
                log.setIpAddress(ipAddress);
            }

            auditLogService.saveLogAsync(log);

        } catch (Exception e) {
            System.err.println("Error in AuditLogAspect: " + e.getMessage());
        }
    }
}
