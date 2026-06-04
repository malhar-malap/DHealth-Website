package com.healthcare.portal.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * HospitalDetail Entity - Specific Details for Hospital Listings
 */
@Entity
@Table(name = "hospital_details")
public class HospitalDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "listing_id", nullable = false, unique = true)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Listing listing;
    
    @Column(name = "number_of_beds")
    private Integer numberOfBeds;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hospital_type_id")
    private HospitalType hospitalType;
    
    @Column(name = "nabh_accredited")
    private Boolean nabhAccredited = false;
    
    @Column(name = "annual_revenue", precision = 15, scale = 2)
    private BigDecimal annualRevenue;
    
    @Column(name = "land_area_sqft", precision = 10, scale = 2)
    private BigDecimal landAreaSqft;
    
    @Column(name = "year_established")
    private Integer yearEstablished;
    

    
    @Column(name = "ip_beds_occupied")
    private Integer ipBedsOccupied;
    
    @Column(name = "stake_percentage", precision = 5, scale = 2)
    private BigDecimal stakePercentage;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Listing getListing() { return listing; }
    public void setListing(Listing listing) { this.listing = listing; }
    public Integer getNumberOfBeds() { return numberOfBeds; }
    public void setNumberOfBeds(Integer numberOfBeds) { this.numberOfBeds = numberOfBeds; }
    public HospitalType getHospitalType() { return hospitalType; }
    public void setHospitalType(HospitalType hospitalType) { this.hospitalType = hospitalType; }
    public Boolean getNabhAccredited() { return nabhAccredited; }
    public void setNabhAccredited(Boolean nabhAccredited) { this.nabhAccredited = nabhAccredited; }
    public BigDecimal getAnnualRevenue() { return annualRevenue; }
    public void setAnnualRevenue(BigDecimal annualRevenue) { this.annualRevenue = annualRevenue; }
    public BigDecimal getLandAreaSqft() { return landAreaSqft; }
    public void setLandAreaSqft(BigDecimal landAreaSqft) { this.landAreaSqft = landAreaSqft; }
    public Integer getYearEstablished() { return yearEstablished; }
    public void setYearEstablished(Integer yearEstablished) { this.yearEstablished = yearEstablished; }

    public Integer getIpBedsOccupied() { return ipBedsOccupied; }
    public void setIpBedsOccupied(Integer ipBedsOccupied) { this.ipBedsOccupied = ipBedsOccupied; }
    public BigDecimal getStakePercentage() { return stakePercentage; }
    public void setStakePercentage(BigDecimal stakePercentage) { this.stakePercentage = stakePercentage; }
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
