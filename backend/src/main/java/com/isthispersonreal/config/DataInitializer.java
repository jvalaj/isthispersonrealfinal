package com.isthispersonreal.config;

import com.isthispersonreal.model.Person;
import com.isthispersonreal.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private PersonRepository personRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        personRepository.deleteAll();
        
        // Add sample data
        personRepository.save(new Person("John Smith", "LinkedIn", "https://linkedin.com/in/johnsmith", 0.95, true));
        personRepository.save(new Person("John Smith", "Twitter", "https://twitter.com/johnsmith", 0.88, true));
        personRepository.save(new Person("John Smith", "Facebook", "https://facebook.com/johnsmith", 0.92, true));
        personRepository.save(new Person("John Smith", "Instagram", "https://instagram.com/johnsmith", 0.85, false));
        
        personRepository.save(new Person("Sarah Johnson", "LinkedIn", "https://linkedin.com/in/sarahjohnson", 0.97, true));
        personRepository.save(new Person("Sarah Johnson", "Twitter", "https://twitter.com/sarahjohnson", 0.91, true));
        personRepository.save(new Person("Sarah Johnson", "Facebook", "https://facebook.com/sarahjohnson", 0.89, true));
        
        personRepository.save(new Person("Michael Brown", "LinkedIn", "https://linkedin.com/in/michaelbrown", 0.93, true));
        personRepository.save(new Person("Michael Brown", "Instagram", "https://instagram.com/michaelbrown", 0.87, false));
        
        personRepository.save(new Person("Emily Davis", "Twitter", "https://twitter.com/emilydavis", 0.94, true));
        personRepository.save(new Person("Emily Davis", "Facebook", "https://facebook.com/emilydavis", 0.90, true));
        personRepository.save(new Person("Emily Davis", "Instagram", "https://instagram.com/emilydavis", 0.86, true));
        
        personRepository.save(new Person("David Wilson", "LinkedIn", "https://linkedin.com/in/davidwilson", 0.96, true));
        personRepository.save(new Person("David Wilson", "Twitter", "https://twitter.com/davidwilson", 0.89, true));
        
        personRepository.save(new Person("Lisa Anderson", "Facebook", "https://facebook.com/lisaanderson", 0.88, true));
        personRepository.save(new Person("Lisa Anderson", "Instagram", "https://instagram.com/lisaanderson", 0.84, false));
        
        personRepository.save(new Person("Robert Taylor", "LinkedIn", "https://linkedin.com/in/roberttaylor", 0.92, true));
        personRepository.save(new Person("Robert Taylor", "Twitter", "https://twitter.com/roberttaylor", 0.86, true));
        
        personRepository.save(new Person("Jennifer Martinez", "Instagram", "https://instagram.com/jennifermartinez", 0.91, true));
        personRepository.save(new Person("Jennifer Martinez", "Facebook", "https://facebook.com/jennifermartinez", 0.87, true));
        
        personRepository.save(new Person("Christopher Garcia", "LinkedIn", "https://linkedin.com/in/christophergarcia", 0.94, true));
        personRepository.save(new Person("Christopher Garcia", "Twitter", "https://twitter.com/christophergarcia", 0.90, true));
        
        personRepository.save(new Person("Amanda Rodriguez", "Facebook", "https://facebook.com/amandarodriguez", 0.89, true));
        personRepository.save(new Person("Amanda Rodriguez", "Instagram", "https://instagram.com/amandarodriguez", 0.85, false));
        
        System.out.println("Sample data initialized successfully!");
    }
} 