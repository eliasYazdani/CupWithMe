package eliasyazdani.capstone.cupwithme.backend.tournament;

import org.springframework.data.annotation.Id;

import java.util.List;

public record Round(
        @Id
        String id,
        List<Match> matches
) {


}
