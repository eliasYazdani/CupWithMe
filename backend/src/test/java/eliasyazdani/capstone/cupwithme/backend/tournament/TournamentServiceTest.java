package eliasyazdani.capstone.cupwithme.backend.tournament;

import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class TournamentServiceTest {
    TournamentRepository tournamentRepository = mock(TournamentRepository.class);
    IdService idService = mock(IdService.class);

    TournamentService tournamentService = new TournamentService(tournamentRepository, idService);


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

    @Test
    void addNewTournamentTest() {
        // given
        TournamentWithoutID testTournamentWithoutId = new TournamentWithoutID("2022", "Hamburg", 32);
        Tournament testTournament =
                new Tournament("1A", testTournamentWithoutId.tournamentName(), testTournamentWithoutId.location(), testTournamentWithoutId.numberOfPlayers());
        Mockito.when(idService.randomId()).thenReturn("1A");
        Mockito.when(tournamentRepository.insert(testTournament))
                .thenReturn(testTournament);
        // when

        Tournament actual = tournamentService.addNewTournament(testTournamentWithoutId);
        // then
        verify(tournamentRepository).insert(testTournament);
        verify(idService).randomId();
        Assertions.assertEquals(testTournament, actual);

    }
}
