package eliasyazdani.capstone.cupwithme.backend.security;

import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MongoUserService {
    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder;


    public String addNewUser(MongoUserWithoutId mongoUserWithoutId) {

        String hashedPassword = passwordEncoder.encode(mongoUserWithoutId.password());
        MongoUser newUser = new MongoUser(
                idService.randomId(),
                mongoUserWithoutId.username(),
                hashedPassword);
        mongoUserRepository.insert(newUser);
        return newUser.username();
    }
}
