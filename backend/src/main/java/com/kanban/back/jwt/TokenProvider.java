package com.kanban.back.jwt;

import com.kanban.back.dto.requestDTO.TokenDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

/**JWT 토큰에 관련된 암호화, 복호화, 검증 로직이 이루어지는 곳
 * 유저 정보로 JWT 토큰을 만들거나 토큰을 바탕으로 유저 정보를 가져옴
 */


@Slf4j
@Component
public class TokenProvider {

    // authorities_key 와 bearer_type 은 토큰을 생성하고 검증할 때 쓰임
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE ="bearer";

    // 토큰의 만료 시간
    // Access Token : 인가받을 때 쓰는 수명이 짧은 토큰
    // Refresh Token : Access Token을 재발급 받을 때 쓰는 수명이 긴 토큰 (DB저장, 관리)
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; //30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24;// 7일


    // JWT를 만들 때 사용하는 암호화 키값을 security에서 불러옴
    private final Key key;

    public TokenProvider(@Value("${jwt.secret}") String secretKey){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    //토큰 생성 메소드
    public TokenDto generateTokenDto(Authentication authentication){
        //Authentication 인터페이스를 확장한 매개변수를 받아서 그 값을 string으로 반환
        //권한들 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        //현재시각과 만료시각을 만든 후 token 생성한 다음 tokenDto에 생성한 token의 정보를 넣는다
        long now = (new Date()).getTime();

        //Access Token 생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())  //payload "sub" : "name"
                .claim(AUTHORITIES_KEY, authorities)  //payload "auth" : "ROLE_USER"
                .setExpiration(accessTokenExpiresIn)        //payload "exp"
                .signWith(key, SignatureAlgorithm.HS512) //header "alg" : HS512
                .compact();

        //Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
                .refreshToken(refreshToken)
                .build();
    }

    //토큰을 받았을 때 토큰의 인증을 꺼내는 메소드
    public Authentication getAuthentication(String accessToken) {

        //토큰 복호화 : string 형태의 토큰을 claim형태로 생성
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        //클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =

                // 인가를 가지고 있다.
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // security에서 유저의 정보를 담는 인터페이스인 userdetails에 token정보와 생성한 인가를 넣고
        UserDetails principal = new User(claims.getSubject(),"",authorities);


        //UsernamePasswordAuthenticationToken 인스턴스는 userdetails를 생성한 후에 securitycontext에 사용하기 위해 만든 절차
        return new UsernamePasswordAuthenticationToken(principal,"",authorities);
    }

    // 토큰을 검증하기 위한 메소드
    public boolean validateToken(String token){
        try{ //parseClaims는 토큰을 claims형태로 만드는 메소드로 권한 정보가 있는지 없는지 체크가 가능
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e){
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e){
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e){
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e){
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    private  Claims parseClaims(String accessToken){
        try{
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        }catch (ExpiredJwtException e){
            return e.getClaims();
        }
    }
}
