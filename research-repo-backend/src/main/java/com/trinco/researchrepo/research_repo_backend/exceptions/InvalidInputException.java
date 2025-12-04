package com.trinco.researchrepo.research_repo_backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class InvalidInputException extends RuntimeException{
    public InvalidInputException(String message){
        super(message);
    }
}

