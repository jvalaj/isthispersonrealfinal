package com.isthispersonreal.service;

import com.isthispersonreal.model.Person;
import com.isthispersonreal.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    
    @Autowired
    private PersonRepository personRepository;
    
    public List<Person> searchPerson(String name) {
        if (name == null || name.trim().isEmpty()) {
            return List.of();
        }
        
        // Return top 5 results ordered by confidence
        return personRepository.findTop5ByNameContainingIgnoreCaseOrderByConfidenceDesc(name.trim());
    }
    
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }
    
    public Person savePerson(Person person) {
        return personRepository.save(person);
    }
} 