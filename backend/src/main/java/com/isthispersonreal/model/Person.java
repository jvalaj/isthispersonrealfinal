package com.isthispersonreal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "persons")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String platform;
    
    private String profileUrl;
    
    @Column(nullable = false)
    private Double confidence;
    
    @Column(nullable = false)
    private Boolean isVerified;
    
    private LocalDateTime lastSeen;
    
    // Constructors
    public Person() {}
    
    public Person(String name, String platform, String profileUrl, Double confidence, Boolean isVerified) {
        this.name = name;
        this.platform = platform;
        this.profileUrl = profileUrl;
        this.confidence = confidence;
        this.isVerified = isVerified;
        this.lastSeen = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getPlatform() {
        return platform;
    }
    
    public void setPlatform(String platform) {
        this.platform = platform;
    }
    
    public String getProfileUrl() {
        return profileUrl;
    }
    
    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }
    
    public Double getConfidence() {
        return confidence;
    }
    
    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }
    
    public Boolean getIsVerified() {
        return isVerified;
    }
    
    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }
    
    public LocalDateTime getLastSeen() {
        return lastSeen;
    }
    
    public void setLastSeen(LocalDateTime lastSeen) {
        this.lastSeen = lastSeen;
    }
} 