package com.healthcare.portal.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * PharmaDetail Entity - Specific Details for Pharma Company Listings
 */
@Entity
@Table(name = "pharma_details")
public class PharmaDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "listing_id", nullable = false, unique = true)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Listing listing;
    
    @Column(name = "annual_turnover", precision = 15, scale = 2)
    private BigDecimal annualTurnover;
    
    @Column(name = "stake_percentage", precision = 5, scale = 2)
    private BigDecimal stakePercentage;
    
    @Column(name = "gmp_certified")
    private Boolean gmpCertified = false;
    
    @Column(name = "fda_certified")
    private Boolean fdaCertified = false;
    
    @Column(name = "who_certified")
    private Boolean whoCertified = false;
    
    @Column(name = "number_of_skus")
    private Integer numberOfSkus;
    
    @Column(name = "product_types", columnDefinition = "TEXT")
    private String productTypes;
    
    @Column(name = "manufacturing_capacity", columnDefinition = "TEXT")
    private String manufacturingCapacity;
    
    @Column(name = "ebitda", precision = 15, scale = 2)
    private BigDecimal ebitda;
    
    @Column(name = "total_land_area_sqft", precision = 10, scale = 2)
    private BigDecimal totalLandAreaSqft;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Listing getListing() { return listing; }
    public void setListing(Listing listing) { this.listing = listing; }
    public BigDecimal getAnnualTurnover() { return annualTurnover; }
    public void setAnnualTurnover(BigDecimal annualTurnover) { this.annualTurnover = annualTurnover; }
    public BigDecimal getStakePercentage() { return stakePercentage; }
    public void setStakePercentage(BigDecimal stakePercentage) { this.stakePercentage = stakePercentage; }
    public Boolean getGmpCertified() { return gmpCertified; }
    public void setGmpCertified(Boolean gmpCertified) { this.gmpCertified = gmpCertified; }
    public Boolean getFdaCertified() { return fdaCertified; }
    public void setFdaCertified(Boolean fdaCertified) { this.fdaCertified = fdaCertified; }
    public Boolean getWhoCertified() { return whoCertified; }
    public void setWhoCertified(Boolean whoCertified) { this.whoCertified = whoCertified; }
    public Integer getNumberOfSkus() { return numberOfSkus; }
    public void setNumberOfSkus(Integer numberOfSkus) { this.numberOfSkus = numberOfSkus; }
    public String getProductTypes() { return productTypes; }
    public void setProductTypes(String productTypes) { this.productTypes = productTypes; }
    public String getManufacturingCapacity() { return manufacturingCapacity; }
    public void setManufacturingCapacity(String manufacturingCapacity) { this.manufacturingCapacity = manufacturingCapacity; }
    public BigDecimal getEbitda() { return ebitda; }
    public void setEbitda(BigDecimal ebitda) { this.ebitda = ebitda; }
    public BigDecimal getTotalLandAreaSqft() { return totalLandAreaSqft; }
    public void setTotalLandAreaSqft(BigDecimal totalLandAreaSqft) { this.totalLandAreaSqft = totalLandAreaSqft; }
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
