package eliasyazdani.capstone.cupwithme.backend.tournament;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("tournaments")
public record Tournament(
        @Id
        String id,
        String admin,
        String tournamentName,
        String location,
        int numberOfPlayers,
        List<Match> matches,
        String champion
) {
}
