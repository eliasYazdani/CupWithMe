package eliasyazdani.capstone.cupwithme.backend.tournament;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record TournamentWithoutIdWithMatch(
        @NotBlank
        String tournamentName,
        @NotBlank
        String location,
        @Positive
        int numberOfPlayers,
        Match match
) {
}