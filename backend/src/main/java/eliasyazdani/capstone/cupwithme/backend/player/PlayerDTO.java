package eliasyazdani.capstone.cupwithme.backend.player;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("players")
public record PlayerDTO(
        String firstName,
        String lastName,
        int age

) {
}
