package com.healthcare.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * EquipmentDetail Entity - Specific Details for Medical Equipment Listings
 */
@Entity
@Table(name = "equipment_details")
public class EquipmentDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "listing_id", nullable = false, unique = true)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Listing listing;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "equipment_type_id")
    private EquipmentType equipmentType;
    
    @Column(length = 100)
    private String brand;
    
    @Column(name = "model_number", length = 100)
    private String modelNumber;
    
    @Column(name = "year_of_manufacture")
    private Integer yearOfManufacture;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "condition_rating", nullable = false, length = 20)
    private ConditionRating conditionRating;
    
    @Column(name = "warranty_available")
    private Boolean warrantyAvailable = false;
    
    @Column(name = "warranty_expiry_date")
    private LocalDate warrantyExpiryDate;
    
    @Column(name = "service_history_doc_url", length = 500)
    private String serviceHistoryDocUrl;
    
    @Column(columnDefinition = "TEXT")
    private String specifications;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum ConditionRating {
        NEW, LIKE_NEW, GOOD, FAIR
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Listing getListing() { return listing; }
    public void setListing(Listing listing) { this.listing = listing; }
    public EquipmentType getEquipmentType() { return equipmentType; }
    public void setEquipmentType(EquipmentType equipmentType) { this.equipmentType = equipmentType; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getModelNumber() { return modelNumber; }
    public void setModelNumber(String modelNumber) { this.modelNumber = modelNumber; }
    public Integer getYearOfManufacture() { return yearOfManufacture; }
    public void setYearOfManufacture(Integer yearOfManufacture) { this.yearOfManufacture = yearOfManufacture; }
    public ConditionRating getConditionRating() { return conditionRating; }
    public void setConditionRating(ConditionRating conditionRating) { this.conditionRating = conditionRating; }
    public Boolean getWarrantyAvailable() { return warrantyAvailable; }
    public void setWarrantyAvailable(Boolean warrantyAvailable) { this.warrantyAvailable = warrantyAvailable; }
    public LocalDate getWarrantyExpiryDate() { return warrantyExpiryDate; }
    public void setWarrantyExpiryDate(LocalDate warrantyExpiryDate) { this.warrantyExpiryDate = warrantyExpiryDate; }
    public String getServiceHistoryDocUrl() { return serviceHistoryDocUrl; }
    public void setServiceHistoryDocUrl(String serviceHistoryDocUrl) { this.serviceHistoryDocUrl = serviceHistoryDocUrl; }
    public String getSpecifications() { return specifications; }
    public void setSpecifications(String specifications) { this.specifications = specifications; }
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
