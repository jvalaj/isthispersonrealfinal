package com.isthispersonreal.controller;

import com.isthispersonreal.model.Person;
import com.isthispersonreal.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class PersonController {
    
    @Autowired
    private PersonService personService;
    
    @QueryMapping
    public List<Person> searchPerson(@Argument String name) {
        return personService.searchPerson(name);
    }
} 