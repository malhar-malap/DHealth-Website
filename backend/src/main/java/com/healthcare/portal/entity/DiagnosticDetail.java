package com.healthcare.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * DiagnosticDetail Entity - Specific Details for Diagnostic Center Listings
 */
@Entity
@Table(name = "diagnostic_details")
public class DiagnosticDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "listing_id", nullable = false, unique = true)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Listing listing;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "diagnostic_type", nullable = false, length = 30)
    private DiagnosticType diagnosticType;
    
    @Column(name = "machines_included", columnDefinition = "TEXT")
    private String machinesIncluded;
    
    @Column(name = "daily_patient_footfall")
    private Integer dailyPatientFootfall;
    
    @Column(name = "nabl_accredited")
    private Boolean nablAccredited = false;
    
    @Column(name = "tests_offered", columnDefinition = "TEXT")
    private String testsOffered;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum DiagnosticType {
        PATHOLOGY_LAB, XRAY, MRI_CT, ULTRASOUND, MULTI_MODALITY
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Listing getListing() { return listing; }
    public void setListing(Listing listing) { this.listing = listing; }
    public DiagnosticType getDiagnosticType() { return diagnosticType; }
    public void setDiagnosticType(DiagnosticType diagnosticType) { this.diagnosticType = diagnosticType; }
    public String getMachinesIncluded() { return machinesIncluded; }
    public void setMachinesIncluded(String machinesIncluded) { this.machinesIncluded = machinesIncluded; }
    public Integer getDailyPatientFootfall() { return dailyPatientFootfall; }
    public void setDailyPatientFootfall(Integer dailyPatientFootfall) { this.dailyPatientFootfall = dailyPatientFootfall; }
    public Boolean getNablAccredited() { return nablAccredited; }
    public void setNablAccredited(Boolean nablAccredited) { this.nablAccredited = nablAccredited; }
    public String getTestsOffered() { return testsOffered; }
    public void setTestsOffered(String testsOffered) { this.testsOffered = testsOffered; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
