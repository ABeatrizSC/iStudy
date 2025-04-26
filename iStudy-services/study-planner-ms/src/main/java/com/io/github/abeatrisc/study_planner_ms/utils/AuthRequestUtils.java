package com.io.github.abeatrisc.study_planner_ms.utils;

import com.io.github.abeatrisc.study_planner_ms.exceptions.UserIdUnavailableException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Objects;

@Component
@AllArgsConstructor
public class AuthRequestUtils {
    private final HttpServletRequest request;

    public String getUserId() {
        String id = request.getHeader("X-User-Id");

        if (id == null) {
            throw new UserIdUnavailableException();
        }

        return id;
    }

    public Boolean isRequestFromCreator(String creatorId) {
        String requestUser = getUserId();

        return Objects.equals(requestUser, creatorId);
    }
}