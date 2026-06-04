package com.healthcare.portal.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTOs for Listing operations
 */
public class ListingDTO {
    
    public static class ListingRequest {
        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title must not exceed 200 characters")
        private String title;
        
        @NotNull(message = "Category is required")
        private Long categoryId;
        
        @NotNull(message = "Deal type is required")
        private Long dealTypeId;
        
        @NotBlank(message = "City is required")
        private String cityName;
        

        @NotNull(message = "Asking price is required")
        @Positive(message = "Asking price must be positive")
        private BigDecimal askingPrice;
        
        private Boolean priceNegotiable = true;
        
        @Size(max = 500, message = "Short description must not exceed 500 characters")
        private String shortDescription;
        
        @Size(max = 3000, message = "Detailed description must not exceed 3000 characters")
        private String detailedDescription;
        
        private Boolean isConfidential = false;
        
        private String confidentialTitle;
        
        private List<String> imageUrls;
        
        // Hospital specific fields
        private Integer numberOfBeds;
        private Long hospitalTypeId;
        private Boolean nabhAccredited;
        private BigDecimal annualRevenue;
        private BigDecimal landAreaSqft;
        private Integer yearEstablished;

        private Integer ipBedsOccupied;
        
        // Pharma specific fields
        private BigDecimal annualTurnover;
        private BigDecimal stakePercentage;
        private Boolean gmpCertified;
        private Boolean fdaCertified;
        private Boolean whoCertified;
        private Integer numberOfSkus;
        private String productTypes;
        private String manufacturingCapacity;
        private BigDecimal ebitda;
        private BigDecimal totalLandAreaSqft;
        
        // Pharmacy specific fields
        private String premisesType;
        private Integer yearsInBusiness;
        private Boolean isFurnished;
        private BigDecimal carpetAreaSqft;
        private String oneLineDescription;
        
        // Diagnostic specific fields
        private String diagnosticType;
        private String machinesIncluded;
        private Integer dailyPatientFootfall;
        private Boolean nablAccredited;
        private String testsOffered;
        
        // Equipment specific fields
        private Long equipmentTypeId;
        private String brand;
        private String modelNumber;
        private Integer yearOfManufacture;
        private String conditionRating;
        private Boolean warrantyAvailable;
        private String warrantyExpiryDate;
        private String serviceHistoryDocUrl;
        private String specifications;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public Long getDealTypeId() { return dealTypeId; }
        public void setDealTypeId(Long dealTypeId) { this.dealTypeId = dealTypeId; }
        public String getCityName() { return cityName; }
        public void setCityName(String cityName) { this.cityName = cityName; }

        public BigDecimal getAskingPrice() { return askingPrice; }
        public void setAskingPrice(BigDecimal askingPrice) { this.askingPrice = askingPrice; }
        public Boolean getPriceNegotiable() { return priceNegotiable; }
        public void setPriceNegotiable(Boolean priceNegotiable) { this.priceNegotiable = priceNegotiable; }
        public String getShortDescription() { return shortDescription; }
        public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
        public String getDetailedDescription() { return detailedDescription; }
        public void setDetailedDescription(String detailedDescription) { this.detailedDescription = detailedDescription; }
        public Boolean getIsConfidential() { return isConfidential; }
        public void setIsConfidential(Boolean isConfidential) { this.isConfidential = isConfidential; }
        public String getConfidentialTitle() { return confidentialTitle; }
        public void setConfidentialTitle(String confidentialTitle) { this.confidentialTitle = confidentialTitle; }
        public List<String> getImageUrls() { return imageUrls; }
        public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
        public Integer getNumberOfBeds() { return numberOfBeds; }
        public void setNumberOfBeds(Integer numberOfBeds) { this.numberOfBeds = numberOfBeds; }
        public Long getHospitalTypeId() { return hospitalTypeId; }
        public void setHospitalTypeId(Long hospitalTypeId) { this.hospitalTypeId = hospitalTypeId; }
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
        public String getDiagnosticType() { return diagnosticType; }
        public void setDiagnosticType(String diagnosticType) { this.diagnosticType = diagnosticType; }
        public String getMachinesIncluded() { return machinesIncluded; }
        public void setMachinesIncluded(String machinesIncluded) { this.machinesIncluded = machinesIncluded; }
        public Integer getDailyPatientFootfall() { return dailyPatientFootfall; }
        public void setDailyPatientFootfall(Integer dailyPatientFootfall) { this.dailyPatientFootfall = dailyPatientFootfall; }
        public Boolean getNablAccredited() { return nablAccredited; }
        public void setNablAccredited(Boolean nablAccredited) { this.nablAccredited = nablAccredited; }
        public String getTestsOffered() { return testsOffered; }
        public void setTestsOffered(String testsOffered) { this.testsOffered = testsOffered; }
        public Long getEquipmentTypeId() { return equipmentTypeId; }
        public void setEquipmentTypeId(Long equipmentTypeId) { this.equipmentTypeId = equipmentTypeId; }
        public String getBrand() { return brand; }
        public void setBrand(String brand) { this.brand = brand; }
        public String getModelNumber() { return modelNumber; }
        public void setModelNumber(String modelNumber) { this.modelNumber = modelNumber; }
        public Integer getYearOfManufacture() { return yearOfManufacture; }
        public void setYearOfManufacture(Integer yearOfManufacture) { this.yearOfManufacture = yearOfManufacture; }
        public String getConditionRating() { return conditionRating; }
        public void setConditionRating(String conditionRating) { this.conditionRating = conditionRating; }
        public Boolean getWarrantyAvailable() { return warrantyAvailable; }
        public void setWarrantyAvailable(Boolean warrantyAvailable) { this.warrantyAvailable = warrantyAvailable; }
        public String getWarrantyExpiryDate() { return warrantyExpiryDate; }
        public void setWarrantyExpiryDate(String warrantyExpiryDate) { this.warrantyExpiryDate = warrantyExpiryDate; }
        public String getServiceHistoryDocUrl() { return serviceHistoryDocUrl; }
        public void setServiceHistoryDocUrl(String serviceHistoryDocUrl) { this.serviceHistoryDocUrl = serviceHistoryDocUrl; }
        public String getSpecifications() { return specifications; }
        public void setSpecifications(String specifications) { this.specifications = specifications; }
    }
    
    public static class ListingResponse {
        private Long id;
        private String uniqueCode;
        private String title;
        private String displayTitle;
        private String shortDescription;
        private String detailedDescription;
        private CategoryDTO category;
        private DealTypeDTO dealType;
        private String cityName;
        private String stateName;
        private BigDecimal askingPrice;
        private Boolean priceNegotiable;
        private Boolean isConfidential;
        private String status;
        private String rejectionReason;
        private Integer viewCount;
        private Integer inquiryCount;
        private Boolean isFeatured;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private LocalDateTime expiresAt;
        private List<String> images;
        private Object categoryDetails; // Can be HospitalDetail, PharmaDetail, etc.
        private SellerInfo seller;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUniqueCode() { return uniqueCode; }
        public void setUniqueCode(String uniqueCode) { this.uniqueCode = uniqueCode; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDisplayTitle() { return displayTitle; }
        public void setDisplayTitle(String displayTitle) { this.displayTitle = displayTitle; }
        public String getShortDescription() { return shortDescription; }
        public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
        public String getDetailedDescription() { return detailedDescription; }
        public void setDetailedDescription(String detailedDescription) { this.detailedDescription = detailedDescription; }
        public CategoryDTO getCategory() { return category; }
        public void setCategory(CategoryDTO category) { this.category = category; }
        public DealTypeDTO getDealType() { return dealType; }
        public void setDealType(DealTypeDTO dealType) { this.dealType = dealType; }
        public String getCityName() { return cityName; }
        public void setCityName(String cityName) { this.cityName = cityName; }
        public String getStateName() { return stateName; }
        public void setStateName(String stateName) { this.stateName = stateName; }

        public BigDecimal getAskingPrice() { return askingPrice; }
        public void setAskingPrice(BigDecimal askingPrice) { this.askingPrice = askingPrice; }
        public Boolean getPriceNegotiable() { return priceNegotiable; }
        public void setPriceNegotiable(Boolean priceNegotiable) { this.priceNegotiable = priceNegotiable; }
        public Boolean getIsConfidential() { return isConfidential; }
        public void setIsConfidential(Boolean isConfidential) { this.isConfidential = isConfidential; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getRejectionReason() { return rejectionReason; }
        public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
        public Integer getViewCount() { return viewCount; }
        public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }
        public Integer getInquiryCount() { return inquiryCount; }
        public void setInquiryCount(Integer inquiryCount) { this.inquiryCount = inquiryCount; }
        public Boolean getIsFeatured() { return isFeatured; }
        public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
        public LocalDateTime getExpiresAt() { return expiresAt; }
        public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
        public List<String> getImages() { return images; }
        public void setImages(List<String> images) { this.images = images; }
        public Object getCategoryDetails() { return categoryDetails; }
        public void setCategoryDetails(Object categoryDetails) { this.categoryDetails = categoryDetails; }
        public SellerInfo getSeller() { return seller; }
        public void setSeller(SellerInfo seller) { this.seller = seller; }
    }
    
    public static class ListingSummaryResponse {
        private Long id;
        private String uniqueCode;
        private String displayTitle;
        private String shortDescription;
        private BigDecimal askingPrice;
        private Boolean priceNegotiable;
        private Boolean isConfidential;
        private String status;
        private String categoryName;
        private String dealType;
        private String cityName;
        private String stateName;
        private String primaryImage;
        private LocalDateTime createdAt;
        private Integer viewCount;
        private Object categoryDetails;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUniqueCode() { return uniqueCode; }
        public void setUniqueCode(String uniqueCode) { this.uniqueCode = uniqueCode; }
        public String getDisplayTitle() { return displayTitle; }
        public void setDisplayTitle(String displayTitle) { this.displayTitle = displayTitle; }
        public String getShortDescription() { return shortDescription; }
        public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
        public BigDecimal getAskingPrice() { return askingPrice; }
        public void setAskingPrice(BigDecimal askingPrice) { this.askingPrice = askingPrice; }
        public Boolean getPriceNegotiable() { return priceNegotiable; }
        public void setPriceNegotiable(Boolean priceNegotiable) { this.priceNegotiable = priceNegotiable; }
        public Boolean getIsConfidential() { return isConfidential; }
        public void setIsConfidential(Boolean isConfidential) { this.isConfidential = isConfidential; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getCategoryName() { return categoryName; }
        public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
        public String getDealType() { return dealType; }
        public void setDealType(String dealType) { this.dealType = dealType; }
        public String getCityName() { return cityName; }
        public void setCityName(String cityName) { this.cityName = cityName; }
        public String getStateName() { return stateName; }
        public void setStateName(String stateName) { this.stateName = stateName; }
        public String getPrimaryImage() { return primaryImage; }
        public void setPrimaryImage(String primaryImage) { this.primaryImage = primaryImage; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
        public Integer getViewCount() { return viewCount; }
        public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }
        public Object getCategoryDetails() { return categoryDetails; }
        public void setCategoryDetails(Object categoryDetails) { this.categoryDetails = categoryDetails; }
    }
    
    public static class CategoryDTO {
        private Long id;
        private String name;
        private String description;
        private String icon;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
    }
    
    public static class DealTypeDTO {
        private Long id;
        private String name;
        private CategoryDTO category;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public CategoryDTO getCategory() { return category; }
        public void setCategory(CategoryDTO category) { this.category = category; }
    }
    
    public static class SellerInfo {
        private Long id;
        private String fullName;
        private String email;
        private String mobileNumber;
        private String companyName;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getMobileNumber() { return mobileNumber; }
        public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
    }
    
    public static class ListingSearchRequest {
        private Long categoryId;
        private Long dealTypeId;
        private Long cityId;
        private Long stateId;
        private String cityName;
        private BigDecimal minPrice;
        private BigDecimal maxPrice;
        private Boolean isConfidential;
        private String keyword;
        private String sortBy = "createdAt";
        private String sortDirection = "desc";
        private Integer page = 0;
        private Integer size = 10;

        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public Long getDealTypeId() { return dealTypeId; }
        public void setDealTypeId(Long dealTypeId) { this.dealTypeId = dealTypeId; }
        public Long getCityId() { return cityId; }
        public void setCityId(Long cityId) { this.cityId = cityId; }
        public Long getStateId() { return stateId; }
        public void setStateId(Long stateId) { this.stateId = stateId; }
        public String getCityName() { return cityName; }
        public void setCityName(String cityName) { this.cityName = cityName; }
        public BigDecimal getMinPrice() { return minPrice; }
        public void setMinPrice(BigDecimal minPrice) { this.minPrice = minPrice; }
        public BigDecimal getMaxPrice() { return maxPrice; }
        public void setMaxPrice(BigDecimal maxPrice) { this.maxPrice = maxPrice; }
        public Boolean getIsConfidential() { return isConfidential; }
        public void setIsConfidential(Boolean isConfidential) { this.isConfidential = isConfidential; }
        public String getKeyword() { return keyword; }
        public void setKeyword(String keyword) { this.keyword = keyword; }
        public String getSortBy() { return sortBy; }
        public void setSortBy(String sortBy) { this.sortBy = sortBy; }
        public String getSortDirection() { return sortDirection; }
        public void setSortDirection(String sortDirection) { this.sortDirection = sortDirection; }
        public Integer getPage() { return page; }
        public void setPage(Integer page) { this.page = page; }
        public Integer getSize() { return size; }
        public void setSize(Integer size) { this.size = size; }
    }
}

