package eliasyazdani.capstone.cupwithme.backend.security;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cup/users")
public class MongoUserController {
    private final MongoUserService mongoUserService;


    @GetMapping("/me")
    public String getUserInfo() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/signup")
    String addNewUser(@Valid @RequestBody MongoUserWithoutId mongoUserWithoutId) {
        return mongoUserService.addNewUser(mongoUserWithoutId);
    }

    @GetMapping("/check-username/{username}")
    public ResponseEntity<Boolean> checkUsernameExist(@PathVariable String username) {
        boolean exists = mongoUserService.doesUsernameExists(username);
        return ResponseEntity.ok(exists);
    }

}
