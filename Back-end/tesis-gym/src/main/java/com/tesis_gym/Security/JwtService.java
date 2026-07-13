package com.tesis_gym.Security;

import com.tesis_gym.Entities.UserAccount;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private static final String SECRET = "EstaEsUnaClaveSuperSecretaParaFirmarElJWTQueDebeSerLarga12345!";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // El token durará 24 horas
    private static final long EXPIRATION_TIME = 86400000;

    public String generateToken(UserAccount user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", user.getRol().name());
        claims.put("name", user.getName());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getCedula().toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getCedulaFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String getRolFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("rol", String.class);
    }

}