package com.io.github.abeatrizsc.auth_ms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterRequestDto {
    private String name;
    private String email;
    private String password;
}
