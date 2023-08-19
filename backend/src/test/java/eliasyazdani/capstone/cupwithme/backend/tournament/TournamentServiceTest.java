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
    void getAllTournamentsTest() {
        //  given
        List<Tournament> testTournamentFromDB = List.of(new Tournament("1A", "2022", "Hamburg", 32, new Match("M1", "E Y", 3, "L S", 2)),
                new Tournament("2A", "2023", "Berlin", 64, new Match("M2", "I S", 1, "P Y", 4)));


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
        MatchWithoutId testMatchWithoutIdInTournamentWithoutId = new MatchWithoutId("", 0, "", 0);
        TournamentWithoutID testTournamentWithoutId = new TournamentWithoutID("Bezirk1", "Hamburg", 2, testMatchWithoutIdInTournamentWithoutId);
        Tournament testTournament =
                new Tournament("1A", testTournamentWithoutId.tournamentName(), testTournamentWithoutId.location(), testTournamentWithoutId.numberOfPlayers(),
                        (new Match("M1", testMatchWithoutIdInTournamentWithoutId.player1(), testMatchWithoutIdInTournamentWithoutId.score1(),
                                testMatchWithoutIdInTournamentWithoutId.player2(), testMatchWithoutIdInTournamentWithoutId.score2())));
        Mockito.when(idService.randomId()).thenReturn("M1").thenReturn("1A");
        Mockito.when(tournamentRepository.insert(testTournament))
                .thenReturn(testTournament);
        // when

        Tournament actual = tournamentService.addNewTournament(testTournamentWithoutId);
        // then
        verify(tournamentRepository).insert(testTournament);
        verify(idService, times(2)).randomId();
        Assertions.assertEquals(testTournament, actual);

    }

    @Test
    void getDetailsByIdTest() {
        // Given
        Optional<Tournament> expected = Optional.of(
                new Tournament("1a", "2022", "Hamburg", 32, new Match("M2", "I S", 1, "P Y", 4)));
        String idToFind = "1a";
        Mockito.when(tournamentRepository.findById(idToFind)).thenReturn(expected);
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
        when(tournamentRepository.findById(idToFind)).thenReturn(Optional.empty());

        // When  and Then
        assertThrows(NoSuchElementException.class, () -> tournamentService.getDetailsById(idToFind));
        verify(tournamentRepository, times(1)).findById(idToFind);
    }

    @Test
    void changeTournamentInfoTest() {
        // Given
        Match match = new Match("M1", "E Y", 3, "L S", 2);
        TournamentWithoutIdWithMatch newTournamentInfoWithoutIdWithMatch = new TournamentWithoutIdWithMatch
                ("2023", "Berlin", 16, match);
        String idToUpdate = "1A";
        Tournament newTournamentInfo = new Tournament(
                idToUpdate,
                newTournamentInfoWithoutIdWithMatch.tournamentName(),
                newTournamentInfoWithoutIdWithMatch.location(),
                newTournamentInfoWithoutIdWithMatch.numberOfPlayers(),
                newTournamentInfoWithoutIdWithMatch.match());
        Mockito.when(tournamentRepository.save(newTournamentInfo)).thenReturn(newTournamentInfo);
        // When
        Tournament actual = tournamentService.changeTournamentInfo(idToUpdate, newTournamentInfoWithoutIdWithMatch);
        // Then
        verify(tournamentRepository).save(newTournamentInfo);
        Assertions.assertEquals(newTournamentInfo, actual);

    }

    @Test
    void deleteTournamentTest() {
        // Given
        String idToDelete = "1A";
        Mockito.when(tournamentRepository.existsById(idToDelete)).thenReturn(true);

        // When
        List<Tournament> actual = tournamentService.deleteTournament(idToDelete);

        // Then
        verify(tournamentRepository).deleteById(idToDelete);
        verify(tournamentRepository).findAll();
        Assertions.assertTrue(actual.isEmpty());

    }

    @Test
    void deleteNotFoundTournament() {
        // Given
        String idToDelete = "1A";
        Mockito.when(tournamentRepository.existsById(idToDelete)).thenReturn(false);
        // When  and Then
        assertThrows(NoSuchElementException.class, () -> tournamentService.deleteTournament(idToDelete));

    }

}
