package eliasyazdani.capstone.cupwithme.backend.tournament;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cup/tournaments")
public class TournamentController {
    private final TournamentService tournamentService;

    @GetMapping
    public List<Tournament> getAllTournaments() {
        return tournamentService.getAllTournaments();
    }

    @PostMapping()
    Tournament addNewTournament(@RequestBody TournamentWithoutID tournamentWithoutID) {
        return tournamentService.addNewTournament(tournamentWithoutID);
    }
}
