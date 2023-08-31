package eliasyazdani.capstone.cupwithme.backend.tournament;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record TournamentWithoutID(
        String admin,
        @NotBlank
        String tournamentName,
        @NotBlank
        String location,
        @Positive
        int numberOfPlayers,
        List<MatchWithoutId> matchesWithoutId,
        String champion
) {
}
