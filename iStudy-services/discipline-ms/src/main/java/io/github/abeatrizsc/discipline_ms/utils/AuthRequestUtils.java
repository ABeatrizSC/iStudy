package io.github.abeatrizsc.discipline_ms.utils;

import io.github.abeatrizsc.discipline_ms.feign.AuthServiceClient;
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
        return authServiceClient.getAuthenticatedUser(token);
    }

    public Boolean isRequestFromCreator(String creatorId) {
        String requestUser = getRequestUserId();

        return Objects.equals(requestUser, creatorId);
    }
}
