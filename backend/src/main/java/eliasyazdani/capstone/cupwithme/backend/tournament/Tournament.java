package eliasyazdani.capstone.cupwithme.backend.tournament;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("tournaments")
public record Tournament(
        @Id
        String id,
        String tournamentName,
        String location,
        int numberOfPlayers
) {
}
