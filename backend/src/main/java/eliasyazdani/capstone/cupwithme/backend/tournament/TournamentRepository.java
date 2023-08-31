package eliasyazdani.capstone.cupwithme.backend.tournament;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentRepository extends MongoRepository<Tournament, String> {
    List<Tournament> findTournamentByAdmin(String admin);
}
