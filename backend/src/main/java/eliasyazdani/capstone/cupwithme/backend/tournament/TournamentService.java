package eliasyazdani.capstone.cupwithme.backend.tournament;


import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TournamentService {
    private final TournamentRepository tournamentRepository;
    private final IdService idService;


    public List<Tournament> getAllTournamentsForAdmin(String admin) {
        return tournamentRepository.findTournamentByAdmin(admin);
    }

    public Tournament addNewTournament(TournamentWithoutID tournamentWithoutID) {
        List<Match> newMatches = new ArrayList<>();
        for (MatchWithoutId matchWithoutId : tournamentWithoutID.matchesWithoutId()) {
            Match newMatch = new Match(
                    idService.randomId(),
                    matchWithoutId.player1(),
                    matchWithoutId.score1(),
                    matchWithoutId.player2(),
                    matchWithoutId.score2()
            );
            newMatches.add(newMatch);
        }
        Tournament newTournament = new Tournament(
                idService.randomId(),
                tournamentWithoutID.admin(),
                tournamentWithoutID.tournamentName(),
                tournamentWithoutID.location(),
                tournamentWithoutID.numberOfPlayers(),
                newMatches,
                tournamentWithoutID.champion()
        );
        tournamentRepository.insert(newTournament);
        return newTournament;
    }

    public Tournament getDetailsById(String id) {
        Optional<Tournament> foundTournament = tournamentRepository.findById(id);
        if (foundTournament.isPresent()) {
            return foundTournament.get();
        } else {
            throw new NoSuchElementException();
        }

    }

    public Tournament changeTournamentInfo(String id, TournamentWithoutIdWithMatch tournamentWithoutIdWithMatch) {
        List<Match> newChangedMatch = new ArrayList<>();
        for (Match match : tournamentWithoutIdWithMatch.matches()) {
            Match newMatch = new Match(
                    match.id(),
                    match.player1(),
                    match.score1(),
                    match.player2(),
                    match.score2()
            );
            newChangedMatch.add(newMatch);
        }
        Tournament newChangedTournament = new Tournament(
                id,
                tournamentWithoutIdWithMatch.admin(),
                tournamentWithoutIdWithMatch.tournamentName(),
                tournamentWithoutIdWithMatch.location(),
                tournamentWithoutIdWithMatch.numberOfPlayers(),
                newChangedMatch,
                tournamentWithoutIdWithMatch.champion()
        );
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
