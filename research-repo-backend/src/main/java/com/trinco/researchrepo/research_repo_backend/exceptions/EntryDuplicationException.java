package com.trinco.researchrepo.research_repo_backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.ALREADY_REPORTED)
public class EntryDuplicationException extends RuntimeException{
    public EntryDuplicationException(String message){
        super(message);
    }
}
