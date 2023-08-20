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
        List<Tournament> testTournamentsFromDB = List.of(new Tournament("1A", "Bezirk1", "Hamburg", 2,
                List.of(new Match("M1", "A", 2, "B", 1),
                        new Match("M2", "C", 3, "D", 0),
                        new Match("M3", "A", 2, "C", 0)), "A"));
        new Tournament("2A", "Bezirk2", "Berlin", 2,
                List.of(new Match("M4", "E", 2, "F", 3),
                        new Match("M5", "G", 5, "H", 1),
                        new Match("M6", "G", 1, "F", 3)), "F");
        Mockito.when(tournamentRepository.findAll())
                .thenReturn(testTournamentsFromDB);
        //  when
        List<Tournament> actual = tournamentService.getAllTournaments();

        //  then
        verify(tournamentRepository).findAll();
        Assertions.assertEquals(testTournamentsFromDB, actual);

    }

    @Test
    void addNewTournamentTest() {
        // given
        List<MatchWithoutId> testMatchesWithoutIdInTournamentWithoutId = List.of(new MatchWithoutId("", 0, "", 0),
                new MatchWithoutId("", 0, "", 0),
                new MatchWithoutId("", 0, "", 0));
        List<Match> tesNewMatchesWithId =
                List.of(new Match("M1", "", 0, "", 0),
                        new Match("M2", "", 0, "", 0),
                        new Match("M3", "", 0, "", 0));
        TournamentWithoutID testTournamentWithoutId = new TournamentWithoutID("Bezirk1", "Hamburg", 4, testMatchesWithoutIdInTournamentWithoutId, "");
        Tournament testNewTournament =
                new Tournament("1A", testTournamentWithoutId.tournamentName(), testTournamentWithoutId.location(), testTournamentWithoutId.numberOfPlayers(),
                        tesNewMatchesWithId, "");
        Mockito.when(idService.randomId()).thenReturn("M1").thenReturn("M2").thenReturn("M3").thenReturn("1A");
        Mockito.when(tournamentRepository.insert(testNewTournament))
                .thenReturn(testNewTournament);
        // when

        Tournament actual = tournamentService.addNewTournament(testTournamentWithoutId);
        // then
        verify(tournamentRepository).insert(testNewTournament);
        verify(idService, times(4)).randomId();
        Assertions.assertEquals(testNewTournament, actual);

    }

    @Test
    void getDetailsByIdTest() {
        // Given
        Optional<Tournament> expected = Optional.of(
                new Tournament("1a", "2022", "Hamburg", 4, List.of(new Match("M1", "A", 2, "B", 1),
                        new Match("M2", "C", 3, "D", 0),
                        new Match("M3", "A", 2, "C", 0)), "A"));
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

        when(tournamentRepository.findById(idToFind)).thenReturn(Optional.empty());

        // When  and Then
        assertThrows(NoSuchElementException.class, () -> tournamentService.getDetailsById(idToFind));
        verify(tournamentRepository, times(1)).findById(idToFind);
    }

    @Test
    void changeTournamentInfoTest() {
        // Given
        List<Match> newMatchesInfo = List.of(new Match("M1", "A", 2, "B", 1),
                new Match("M2", "C", 3, "D", 0),
                new Match("M3", "A", 2, "C", 0));
        TournamentWithoutIdWithMatch newTournamentInfoWithoutIdWithMatch = new TournamentWithoutIdWithMatch(
                "2023", "Berlin", 4, newMatchesInfo, "A");
        String idToUpdate = "1A";
        Tournament newTournamentInfo = new Tournament(
                idToUpdate,
                newTournamentInfoWithoutIdWithMatch.tournamentName(),
                newTournamentInfoWithoutIdWithMatch.location(),
                newTournamentInfoWithoutIdWithMatch.numberOfPlayers(),
                newMatchesInfo,
                newTournamentInfoWithoutIdWithMatch.champion());
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
