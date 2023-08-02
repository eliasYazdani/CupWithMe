package eliasyazdani.capstone.cupwithme.backend.player;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class PlayerServiceTest {
    PlayerRepository playerRepository = mock(PlayerRepository.class);
    IdService idService = mock(IdService.class);
    PlayerService playerService = new PlayerService(playerRepository, idService);

    @Test
    void getAllPlayersTest() {
        //  given
        List<Player> testPlayerFromDB = List.of(new Player("a1", "E", "Y", 42),
                new Player("a2", "I", "S", 35));
        Mockito.when(playerRepository.findAll())
                .thenReturn(testPlayerFromDB);
        //  when
        List<Player> actual = playerService.getAllPlayers();

        //  then
        verify(playerRepository).findAll();
        Assertions.assertEquals(testPlayerFromDB, actual);
    }

    @Test
    void addNewPlayerTest() {
        // given
        PlayerWithoutId testPlayerWithoutId = new PlayerWithoutId("ATest", "BTest", 20);
        Player testPlayer =
                new Player("1A", testPlayerWithoutId.firstName(), testPlayerWithoutId.lastName(), testPlayerWithoutId.age());
        Mockito.when(idService.randomId()).thenReturn("1A");
        Mockito.when(playerRepository.insert(testPlayer))
                .thenReturn(testPlayer);
        // when

        Player actual = playerService.addNewPlayer(testPlayerWithoutId);
        // then
        verify(playerRepository).insert(testPlayer);
        verify(idService).randomId();
        Assertions.assertEquals(testPlayer, actual);
    }

    @Test
    void getDetailsByIdTest() {
        // Given
        Optional<Player> expected = Optional.of(
                new Player("1a", "P", "Y", 46));
        String idToFind = "1a";
        when(playerRepository.findById(idToFind)).thenReturn(expected);
        // When
        Player actual = playerService.getDetailsById(idToFind);
        // Then
        verify(playerRepository).findById(idToFind);
        Assertions.assertEquals(expected.get(), actual);
    }

    @Test
    void changePlayerInfoTest() {
        // Given
        PlayerWithoutId newPlayerInfoWithoutID = new PlayerWithoutId("A", "B", 28);
        String idToUpdate = "1A";
        Player newPlayerInfo = new Player(
                idToUpdate,
                newPlayerInfoWithoutID.firstName(),
                newPlayerInfoWithoutID.lastName(),
                newPlayerInfoWithoutID.age());
        Mockito.when(playerRepository.save(newPlayerInfo)).thenReturn(newPlayerInfo);
        // When
        Player actual = playerService.changePlayerInfo(idToUpdate, newPlayerInfoWithoutID);
        // Then
        verify(playerRepository).save(newPlayerInfo);
        Assertions.assertEquals(newPlayerInfo, actual);

    }

    @Test
    void deletePlayerTest() {
        // Given
        String idToDelete = "1A";
        Mockito.when(playerRepository.existsById(idToDelete)).thenReturn(true);
        Mockito.doNothing().when(playerRepository).deleteById(idToDelete);

        // When
        playerService.deletePlayer(idToDelete);
        // List<Player> actual = playerService.getAllPlayers();
        // Then
        verify(playerRepository).deleteById(idToDelete);
        // Assertions.assertTrue(actual.isEmpty());

    }
}