package eliasyazdani.capstone.cupwithme.backend.tournament;


import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    public Tournament getDetailsById(String id) {
        Optional<Tournament> foundtournament = tournamentRepository.findById(id);
        if (foundtournament.isPresent()) {
            return foundtournament.get();
        } else {
            throw new NoSuchElementException();
        }

    }

    public Tournament changeTournamentInfo(String id, TournamentWithoutID tournamentWithoutID) {
        Tournament newChangedTournament = new Tournament(
                id,
                tournamentWithoutID.tournamentName(),
                tournamentWithoutID.location(),
                tournamentWithoutID.numberOfPlayers());
        return tournamentRepository.save(newChangedTournament);
    }

    public List<Tournament> deleteTournament(String id) {
        if (!tournamentRepository.existsById(id)) {
            throw new NoSuchElementException();
        }
        tournamentRepository.deleteById(id);
        return tournamentRepository.findAll();
    }
}
