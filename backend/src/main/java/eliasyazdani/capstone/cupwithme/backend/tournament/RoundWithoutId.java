package eliasyazdani.capstone.cupwithme.backend.tournament;


import java.util.List;

public record RoundWithoutId(
        List<MatchWithoutId> matchesWithoutId
) {

}
