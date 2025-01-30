package com.io.abeatrizsc.api_gateway.filter;

import com.io.abeatrizsc.api_gateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RestTemplate template;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RouteValidator validator;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {
            if (validator.isSecured.test(exchange.getRequest())) {
                List<String> authHeaders = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION);

                if (authHeaders == null || authHeaders.isEmpty()) {
                    throw new RuntimeException("missing authorization header");
                }

                String authHeader = authHeaders.get(0);
                if (authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }

                if (jwtUtil.validateToken(authHeader) == null) {
                    throw new RuntimeException("unauthorized access to application");
                }
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {}
}
