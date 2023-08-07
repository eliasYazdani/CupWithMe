package eliasyazdani.capstone.cupwithme.backend.tournament;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class TournamentServiceTest {
    TournamentRepository tournamentRepository = mock(TournamentRepository.class);
    TournamentService tournamentService = new TournamentService(tournamentRepository);


    @Test
    void getAllTournamentsTes() {
        //  given
        List<Tournament> testTournamentFromDB = List.of(new Tournament("1A", "2022", "Hamburg", 32),
                new Tournament("2A", "2023", "Berlin", 64));
        Mockito.when(tournamentRepository.findAll())
                .thenReturn(testTournamentFromDB);
        //  when
        List<Tournament> actual = tournamentService.getAllTournaments();

        //  then
        verify(tournamentRepository).findAll();
        Assertions.assertEquals(testTournamentFromDB, actual);

    }
}
