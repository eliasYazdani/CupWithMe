package eliasyazdani.capstone.cupwithme.backend.tournament;

import org.springframework.data.annotation.Id;

public record Match(
        @Id
        String id,
        String player1,
        int score1,
        String player2,
        int score2

) {
}
