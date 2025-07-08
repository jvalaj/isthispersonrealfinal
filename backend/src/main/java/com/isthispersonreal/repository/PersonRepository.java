package com.isthispersonreal.repository;

import com.isthispersonreal.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    
    @Query("SELECT p FROM Person p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) ORDER BY p.confidence DESC")
    List<Person> findByNameContainingIgnoreCaseOrderByConfidenceDesc(@Param("name") String name);
    
    List<Person> findTop5ByNameContainingIgnoreCaseOrderByConfidenceDesc(String name);
} 