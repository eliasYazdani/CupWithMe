package eliasyazdani.capstone.cupwithme.backend.tournament;

import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

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

    @Test
    void getDetailsByIdTest() {
        // Given
        Optional<Tournament> expected = Optional.of(
                new Tournament("1a", "2022", "Hamburg", 32));
        String idToFind = "1a";
        when(tournamentRepository.findById(idToFind)).thenReturn(expected);
        // When
        Tournament actual = tournamentService.getDetailsById(idToFind);
        // Then
        verify(tournamentRepository).findById(idToFind);
        Assertions.assertEquals(expected.get(), actual);
    }

    @Test
    void getDetailsNotFoundId() {
        // Given
        String idToFind = "1A";
        Optional<Tournament> foundTournamentTest = Optional.empty();
        Mockito.when(tournamentRepository.findById(idToFind)).thenReturn(foundTournamentTest);
        // When  and Then
        assertThrows(NoSuchElementException.class, () -> tournamentService.getDetailsById(idToFind));
    }

    @Test
    void changeTournamentInfoTest() {
        // Given
        TournamentWithoutID newTournamentInfoWithoutID = new TournamentWithoutID("2023", "Berlin", 16);
        String idToUpdate = "1A";
        Tournament newTournamentInfo = new Tournament(
                idToUpdate,
                newTournamentInfoWithoutID.tournamentName(),
                newTournamentInfoWithoutID.location(),
                newTournamentInfoWithoutID.numberOfPlayers());
        Mockito.when(tournamentRepository.save(newTournamentInfo)).thenReturn(newTournamentInfo);
        // When
        Tournament actual = tournamentService.changeTournamentInfo(idToUpdate, newTournamentInfoWithoutID);
        // Then
        verify(tournamentRepository).save(newTournamentInfo);
        Assertions.assertEquals(newTournamentInfo, actual);

    }

}
