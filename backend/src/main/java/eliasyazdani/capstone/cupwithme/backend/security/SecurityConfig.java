package eliasyazdani.capstone.cupwithme.backend.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@EnableWebSecurity
@Configuration
public class SecurityConfig {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName(null);

        return http.csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(requestHandler))
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(httpSecurity -> httpSecurity
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase())))
                .authorizeHttpRequests(httpRequests ->
                        httpRequests
                                .requestMatchers("/").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/cup/players").permitAll()
                                .requestMatchers("/api/cup/players").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/cup/players/**").permitAll()
                                .requestMatchers("/api/cup/players/**").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/cup/tournaments").permitAll()
                                .requestMatchers("/api/cup/tournaments").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/cup/tournaments/**").permitAll()
                                .requestMatchers("/api/cup/tournaments/**").authenticated()
                                .requestMatchers("/api/cup/users/me").permitAll()
                                .requestMatchers("/api/cup/users/login").permitAll()
                                .requestMatchers("/api/cup/users/logout").permitAll()
                                .requestMatchers("/api/cup/users/signup").permitAll()
                                .anyRequest().permitAll()
                )
                .logout(logout -> logout.logoutUrl("/api/cup/users/logout")
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessHandler((request, response, authentication) ->
                                response.setStatus(HttpServletResponse.SC_OK)
                        ))
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }
}
