package com.io.github.abeatrizsc.study_tracker_ms.utils;


import com.io.github.abeatrizsc.study_tracker_ms.exceptions.FeignConnectionException;
import com.io.github.abeatrizsc.study_tracker_ms.feign.AuthServiceClient;
import feign.FeignException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Objects;

@Component
@AllArgsConstructor
public class AuthRequestUtils {
    private AuthServiceClient authServiceClient;

    public String getAuthorizationToken() {
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            return request.getHeader("Authorization");
        }
        return null;
    }

    public String getRequestUserId() {
        String token = getAuthorizationToken();
        try {
            return authServiceClient.getAuthenticatedUser(token);

        } catch (FeignException e) {
            throw new FeignConnectionException();
        }
    }

    public Boolean isRequestFromCreator(String creatorId) {
        String requestUser = getRequestUserId();

        return Objects.equals(requestUser, creatorId);
    }
}
