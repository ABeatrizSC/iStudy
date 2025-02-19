package com.io.github.abeatrizsc.study_tracker_ms.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "auth-ms", path = "/auth")
public interface AuthServiceClient {
    @GetMapping("/authenticated-user")
    String getAuthenticatedUser(@RequestHeader("Authorization") String token);
}