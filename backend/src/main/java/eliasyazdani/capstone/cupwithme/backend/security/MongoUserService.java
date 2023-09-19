package eliasyazdani.capstone.cupwithme.backend.security;

import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MongoUserService {
    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder;


    public String addNewUser(MongoUserWithoutId mongoUserWithoutId) {
        Optional<MongoUser> existingUser = mongoUserRepository.findByUsername(mongoUserWithoutId.username());

        if (existingUser.isPresent()) {
            return "This username is already taken";
        } else {
            String hashedPassword = passwordEncoder.encode(mongoUserWithoutId.password());
            MongoUser newUser = new MongoUser(
                    idService.randomId(),
                    mongoUserWithoutId.username(),
                    hashedPassword);
            mongoUserRepository.insert(newUser);
            return newUser.username();
        }
    }

    public boolean doesUsernameExists(String username) {
        Optional<MongoUser> existingUser = mongoUserRepository.findByUsername(username);
        return existingUser.isPresent();
    }
}
