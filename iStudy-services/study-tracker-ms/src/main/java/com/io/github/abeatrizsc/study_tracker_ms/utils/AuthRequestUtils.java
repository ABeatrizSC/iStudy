package com.io.github.abeatrizsc.study_tracker_ms.utils;

import com.io.github.abeatrizsc.study_tracker_ms.exceptions.InvalidTokenException;
import com.io.github.abeatrizsc.study_tracker_ms.exceptions.UserIdUnavailableException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

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

    public String getToken() {
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            return request.getHeader("Authorization");
        }

        throw new InvalidTokenException();
    }
}
