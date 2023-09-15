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
        List<Tournament> expectedTournamentsForAdminA = List.of(
                new Tournament("T1", "adminA", "Bezirk1", "Hamburg", 4,
                        List.of(
                                new Round("R1",
                                        List.of(
                                                new Match("M1", "A", 2, "B", 1),
                                                new Match("M2", "C", 3, "D", 0))),
                                new Round("R2", List.of(new Match("M3", "A", 2, "C", 1)))), "A"));
        new Tournament("T2", "adminA", "Bezirk2", "Berlin", 4,
                List.of(
                        new Round("R3",
                                List.of(
                                        new Match("M4", "E", 0, "F", 1),
                                        new Match("M5", "G", 3, "H", 2))),
                        new Round("R4", List.of(new Match("M6", "F", 2, "G", 3)))), "G");

        Mockito.when(tournamentRepository.findTournamentByAdmin("adminA"))
                .thenReturn(expectedTournamentsForAdminA);
        //  when
        List<Tournament> actual = tournamentService.getAllTournamentsForAdmin("adminA");

        //  then
        verify(tournamentRepository).findTournamentByAdmin("adminA");
        Assertions.assertEquals(expectedTournamentsForAdminA, actual);

    }

    @Test
    void addNewTournamentTest() {
        // given
        List<RoundWithoutId> roundsWithoutId = List.of(
                new RoundWithoutId(List.of(
                        new MatchWithoutId("", 0, "", 0),
                        new MatchWithoutId("", 0, "", 0))),
                new RoundWithoutId(List.of(
                        new MatchWithoutId("", 0, "", 0))));


        List<Round> roundsWithId = List.of(
                new Round("R1", List.of(
                        new Match("M1", "", 0, "", 0),
                        new Match("M2", "", 0, "", 0))),
                new Round("R2", List.of(
                        new Match("M3", "", 0, "", 0))));


        TournamentWithoutID newTournamentWithoutId = new TournamentWithoutID("adminA", "Bezirk1", "Hamburg", 4, roundsWithoutId, "");
        Tournament newTournamentWithId =
                new Tournament("T1", newTournamentWithoutId.admin(), newTournamentWithoutId.tournamentName(), newTournamentWithoutId.location(), newTournamentWithoutId.numberOfPlayers(),
                        roundsWithId, "");
        Mockito.when(idService.randomId()).thenReturn("R1").thenReturn("M1").thenReturn("M2").thenReturn("R2").thenReturn("M3").thenReturn("T1");
        Mockito.when(tournamentRepository.insert(newTournamentWithId))
                .thenReturn(newTournamentWithId);
        // when

        Tournament actual = tournamentService.addNewTournament(newTournamentWithoutId);
        // then
        verify(tournamentRepository).insert(newTournamentWithId);
        verify(idService, times(6)).randomId();
        Assertions.assertEquals(newTournamentWithId, actual);

    }

    @Test
    void getDetailsByIdTest() {
        // Given
        Optional<Tournament> expected = Optional.of(
                new Tournament("T1", "adminA", "2022", "Hamburg", 4, List.of(
                        new Round("R1", List.of(
                                new Match("M1", "A", 3, "B", 1),
                                new Match("M2", "C", 1, "D", 0))),
                        new Round("R2", List.of(
                                new Match("M3", "A", 2, "C", 1)))), "A"));

        String idToFind = "T1";
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
        String idToFind = "T1";
        when(tournamentRepository.findById(idToFind)).thenReturn(Optional.empty());

        // When  and Then
        assertThrows(NoSuchElementException.class, () -> tournamentService.getDetailsById(idToFind));
        verify(tournamentRepository, times(1)).findById(idToFind);
    }

    @Test
    void changeTournamentInfoTest() {
        // Given
        List<Round> newRoundsInfo = List.of(
                new Round("R1", List.of(
                        new Match("M1", "C", 3, "D", 0),
                        new Match("M2", "C", 3, "D", 0))),
                new Round("R2", List.of(
                        new Match("M3", "C", 3, "D", 0))));
        TournamentWithoutIdWithRounds newTournamentInfoWithoutIdWithRounds = new TournamentWithoutIdWithRounds(
                "adminA", "2023", "Berlin", 4, newRoundsInfo, "A");
        String idToUpdate = "T1";
        Tournament newTournamentInfo = new Tournament(
                idToUpdate,
                newTournamentInfoWithoutIdWithRounds.admin(),
                newTournamentInfoWithoutIdWithRounds.tournamentName(),
                newTournamentInfoWithoutIdWithRounds.location(),
                newTournamentInfoWithoutIdWithRounds.numberOfPlayers(),
                newRoundsInfo,
                newTournamentInfoWithoutIdWithRounds.champion());
        Mockito.when(tournamentRepository.save(newTournamentInfo)).thenReturn(newTournamentInfo);
        // When
        Tournament actual = tournamentService.changeTournamentInfo(idToUpdate, newTournamentInfoWithoutIdWithRounds);
        // Then
        verify(tournamentRepository).save(newTournamentInfo);
        Assertions.assertEquals(newTournamentInfo, actual);

    }

    @Test
    void deleteTournamentTest() {
        // Given
        String tournamentIdToDelete = "T1";
        Mockito.when(tournamentRepository.existsById(tournamentIdToDelete)).thenReturn(true);

        // When
        tournamentService.deleteTournament(tournamentIdToDelete);

        // Then
        verify(tournamentRepository, times(1)).existsById(tournamentIdToDelete);
        verify(tournamentRepository, times(1)).deleteById(tournamentIdToDelete);


    }


    @Test
    void testDeleteTournamentNotFound() {
        // Arrange
        String tournamentId = "123";

        // Define the behavior of the mock
        when(tournamentRepository.existsById(tournamentId)).thenReturn(false);

        // Act and Assert
        // Ensure that a NoSuchElementException is thrown when the tournament does not exist
        assertThrows(NoSuchElementException.class, () -> tournamentService.deleteTournament(tournamentId));
    }

    @Test
    void deleteNotFoundTournament() {
        // Given
        String tournamentIdToDelete = "T1";
        Mockito.when(tournamentRepository.existsById(tournamentIdToDelete)).thenReturn(false);
        // When  and Then
        assertThrows(NoSuchElementException.class, () -> tournamentService.deleteTournament(tournamentIdToDelete));

    }

}
