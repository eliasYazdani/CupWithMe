package eliasyazdani.capstone.cupwithme.backend.tournament;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TournamentService {
    private final TournamentRepository tournamentRepository;


    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }
}
