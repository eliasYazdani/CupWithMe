package eliasyazdani.capstone.cupwithme.backend.tournament;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cup/tournaments")
public class TournamentController {
    private final TournamentService tournamentService;

    @GetMapping
    public List<Tournament> getAllTournamentsForAdmin(Authentication authentication) {
        String loggedInAdmin = authentication.getName();
        return tournamentService.getAllTournamentsForAdmin(loggedInAdmin);
    }

    @PostMapping()
    Tournament addNewTournament(@Valid @RequestBody TournamentWithoutID tournamentWithoutID) {
        return tournamentService.addNewTournament(tournamentWithoutID);
    }

  @GetMapping("/{id}")
  public Tournament getDetails(@PathVariable String id) {
      return tournamentService.getDetailsById(id);
  }

  @PutMapping("/{id}")
  public Tournament changeTournamentInfo(@PathVariable String id, @Valid @RequestBody TournamentWithoutIdWithRounds tournamentWithoutIdWithRounds) {
      return tournamentService.changeTournamentInfo(id, tournamentWithoutIdWithRounds);
  }

    @DeleteMapping("/{id}")
    public void deleteTournament(@PathVariable String id) {
        tournamentService.deleteTournament(id);
    }


}
