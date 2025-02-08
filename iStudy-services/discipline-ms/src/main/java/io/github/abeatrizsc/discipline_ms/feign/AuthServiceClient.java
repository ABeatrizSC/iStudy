package io.github.abeatrizsc.discipline_ms.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(url = "http://localhost:8080/auth", name = "auth-ms")
public interface AuthServiceClient {
    @GetMapping("/authenticated-user")
    String getAuthenticatedUser(@RequestHeader("Authorization") String token);
}