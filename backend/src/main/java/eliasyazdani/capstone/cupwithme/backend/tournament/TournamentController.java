package eliasyazdani.capstone.cupwithme.backend.tournament;

import jakarta.validation.Valid;
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

    @GetMapping("/{id}")
    public Tournament getDetails(@PathVariable String id) {
        return tournamentService.getDetailsById(id);
    }

    @PutMapping("/{id}")
    public Tournament changeTournamentInfo(@PathVariable String id, @Valid @RequestBody TournamentWithoutID tournamentWithoutID) {
        return tournamentService.changeTournamentInfo(id, tournamentWithoutID);
    }

    @DeleteMapping("/{id}")
    public List<Tournament> deleteTournament(@PathVariable String id) {
        return tournamentService.deleteTournament(id);
    }


}
