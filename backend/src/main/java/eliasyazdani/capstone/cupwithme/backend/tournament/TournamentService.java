package eliasyazdani.capstone.cupwithme.backend.tournament;


import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TournamentService {
    private final TournamentRepository tournamentRepository;
    private final IdService idService;


    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    public Tournament addNewTournament(TournamentWithoutID tournamentWithoutID) {
        Tournament newTournament = new Tournament(
                idService.randomId(),
                tournamentWithoutID.tournamentName(),
                tournamentWithoutID.location(),
                tournamentWithoutID.numberOfPlayers()
        );
        tournamentRepository.insert(newTournament);
        return newTournament;
    }
}
