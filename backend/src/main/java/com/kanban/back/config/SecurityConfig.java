package com.kanban.back.config;

import com.kanban.back.jwt.JwtAccessDeniedHandler;
import com.kanban.back.jwt.JwtAuthenticationEntryPoint;
import com.kanban.back.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

/**
 * Spring Security 환경 설정을 구성하기 위한 클래스
 * 웹 서비스가 로드 될때 Spring Container 의해 관리가 되는 클래스
 * 사용자에 대한 인증과 인가에 대한 구성을 Bean으로 주입
 */

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@Component
public class SecurityConfig  {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    //private final CorsFilter corsFilter;

    //request로부터 받은 비밀번호를 암호화하기 위해
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    /**
     * Http에 대해서 인증과 인가를 담당하는 메서드, 필터를 통해 인증 방식과 인증 절차에 대해서 등록 및 설정 담당
     * @param http HttpSecurity
     * @return SecurityFilterChain
     * @throws Exception Exception
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        //csrf 설정 disable : 서버에 인증정보 저장하지 않음. 즉, 리액트에서 token을 localstorage에 저장하기 때문
        // 시큐리티는 기본적으로 세션을 사용
        // jwt 사용으로 세션을 사용하지 않기 때문에 세션 설정은 stateless
        http.csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)//세션을 사용하지 않겠다

                .and() // exception handling 할 때 customize 한 클래스 추가
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)


                .and()
                //.addFilter(corsFilter) //인증x -> @cros 인증o-> 시큐리티 필터사용
                .formLogin().disable() //form tag 를 이용한 로그인을 쓰지 않겠다
                .httpBasic().disable() //기본적인 http 로그인 방식을 쓰지 않겠다
                .authorizeHttpRequests()
                //// 로그인, 회원가입 API 는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll
                .requestMatchers("**").permitAll()
                .anyRequest().authenticated() // 나머지 api 는 전부 인증 필요

                //JwtSecurityConfig 클래스 적용
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));



        return http.build();


    }
}
