package com.healthcare.portal.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * PharmacyDetail Entity - Specific Details for Pharmacy Listings
 */
@Entity
@Table(name = "pharmacy_details")
public class PharmacyDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "listing_id", nullable = false, unique = true)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Listing listing;
    
    @Column(name = "premises_type", length = 50)
    private String premisesType;
    
    @Column(name = "years_in_business")
    private Integer yearsInBusiness;
    
    @Column(name = "is_furnished")
    private Boolean isFurnished;
    
    @Column(name = "carpet_area_sqft", precision = 10, scale = 2)
    private BigDecimal carpetAreaSqft;
    
    @Column(name = "one_line_description", length = 500)
    private String oneLineDescription;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Listing getListing() { return listing; }
    public void setListing(Listing listing) { this.listing = listing; }
    public String getPremisesType() { return premisesType; }
    public void setPremisesType(String premisesType) { this.premisesType = premisesType; }
    public Integer getYearsInBusiness() { return yearsInBusiness; }
    public void setYearsInBusiness(Integer yearsInBusiness) { this.yearsInBusiness = yearsInBusiness; }
    public Boolean getIsFurnished() { return isFurnished; }
    public void setIsFurnished(Boolean isFurnished) { this.isFurnished = isFurnished; }
    public BigDecimal getCarpetAreaSqft() { return carpetAreaSqft; }
    public void setCarpetAreaSqft(BigDecimal carpetAreaSqft) { this.carpetAreaSqft = carpetAreaSqft; }
    public String getOneLineDescription() { return oneLineDescription; }
    public void setOneLineDescription(String oneLineDescription) { this.oneLineDescription = oneLineDescription; }
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
