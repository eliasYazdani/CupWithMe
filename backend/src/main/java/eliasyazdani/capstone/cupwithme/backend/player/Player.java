package eliasyazdani.capstone.cupwithme.backend.player;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("players")
public record Player (
    @Id
    String id,
    String firstName,
    String lastName,
    int age
    ){

}

