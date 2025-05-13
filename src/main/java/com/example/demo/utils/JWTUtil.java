package com.example.demo.utils;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import io.jsonwebtoken.security.Keys;
import java.util.Date;

/**
 * Utility class for handling JWT (JSON Web Token) operations.
 * Provides methods for creating, validating, and extracting data from JWT tokens.
 */
@Component
public class JWTUtil {
    /** Secret key used for signing JWT tokens (loaded from application properties). */
    @Value("${security.jwt.secret}")
    private String key;

    /** Issuer of the JWT tokens (loaded from application properties). */
    @Value("${security.jwt.issuer}")
    private String issuer;

    /** Token time-to-live in milliseconds (loaded from application properties). */
    @Value("${security.jwt.ttlMillis}")
    private long ttlMillis;

    /** Logger for tracking JWT-related actions and errors. */
    private final Logger log = LoggerFactory.getLogger(JWTUtil.class);

    /**
     * Generates a JWT token containing the given ID and subject.
     *
     * @param id The unique identifier for the token.
     * @param subject The subject associated with the token (typically the user's email or username).
     * @return A signed JWT token as a compact string.
     */
    public String create(String id, String subject) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        Key signingKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(key));

        JwtBuilder builder = Jwts.builder()
                .setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer(issuer)
                .signWith(signingKey, SignatureAlgorithm.HS256);

        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }
        return builder.compact();
    }

    /**
     * Extracts the subject (typically the email or username) from a JWT token.
     *
     * @param jwt The JWT token to parse.
     * @return The subject of the token.
     */
    public String getValue(String jwt) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(Base64.getDecoder().decode(key)))
                .build()
                .parseClaimsJws(jwt)
                .getBody();

        return claims.getSubject();
    }

    /**
     * Extracts the unique identifier (ID) from a JWT token.
     *
     * @param jwt The JWT token to parse.
     * @return The ID associated with the token.
     */
    public String getKey(String jwt) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(Base64.getDecoder().decode(key)))
                .build()
                .parseClaimsJws(jwt)
                .getBody();

        return claims.getId();
    }

    /**
     * Validates whether the given JWT token is properly signed and unexpired.
     *
     * @param jwt The JWT token to validate.
     * @return {@code true} if the token is valid, {@code false} otherwise.
     */
    public boolean isValidToken(String jwt){
        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(Base64.getDecoder().decode(key)))
                    .build()
                    .parseClaimsJws(jwt);
            return true;
        } catch (JwtException e){
            System.out.println("Token invalid: "+e.getMessage());
            return false;
        }
    }
}
