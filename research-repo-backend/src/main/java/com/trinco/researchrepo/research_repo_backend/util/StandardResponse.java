package com.trinco.researchrepo.research_repo_backend.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StandardResponse {

    private int code;
    private String message;
    private Object data;
}
