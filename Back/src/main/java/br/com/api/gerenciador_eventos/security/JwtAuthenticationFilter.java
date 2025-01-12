package br.com.api.gerenciador_eventos.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            logger.debug("Token: {}", token);

            if (JwtUtil.isTokenValid(token)) {
                String email = JwtUtil.extractEmail(token);
                Long userId = JwtUtil.extractId(token);

                logger.debug("Token válido. Email: {}, UserID: {}", email, userId);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(email, null, null);
                authentication.setDetails(userId);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                logger.debug("Token inválido.");
            }
        } else {
            logger.debug("Cabeçalho de autorização não encontrado ou formato inválido.");
        }

        filterChain.doFilter(request, response);
    }
}