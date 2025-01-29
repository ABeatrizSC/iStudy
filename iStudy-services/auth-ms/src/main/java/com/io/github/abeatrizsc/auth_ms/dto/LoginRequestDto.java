package com.io.github.abeatrizsc.auth_ms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequestDto {
    private String email;
    private String password;
}
