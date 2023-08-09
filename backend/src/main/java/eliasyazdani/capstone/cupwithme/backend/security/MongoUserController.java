package eliasyazdani.capstone.cupwithme.backend.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/cup/users")
public class MongoUserController {

    @GetMapping("me")
    public String getUserInfo(Principal principal) {
        if (principal == null) {
            return "anonymousUser";
        }
        return principal.getName();
    }
}
