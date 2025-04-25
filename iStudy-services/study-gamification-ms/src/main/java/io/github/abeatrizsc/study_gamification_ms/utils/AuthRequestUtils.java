package io.github.abeatrizsc.study_gamification_ms.utils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@AllArgsConstructor
public class AuthRequestUtils {
    private final HttpServletRequest request;

    public String getUserId() {
        return request.getHeader("X-User-Id");
    }

    public Boolean isRequestFromCreator(String creatorId) {
        String requestUser = getUserId();

        return Objects.equals(requestUser, creatorId);
    }
}
