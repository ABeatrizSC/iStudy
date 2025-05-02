package com.io.abeatrizsc.api_gateway.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private String secret = System.getenv("JWT_KEY");

    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-ms")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (
                JWTVerificationException exception){
            return null;
        }
    }
}
