package eliasyazdani.capstone.cupwithme.backend.player;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class PlayerServiceTest {
    PlayerRepository playerRepository = mock(PlayerRepository.class);
    PlayerService playerService = new PlayerService(playerRepository);

    @Test
    void getAllPlayersTest() {
        //  given
        List<Player> testPlayerFromDB = List.of(new Player("abc", "E", "Y", 42));
        List<PlayerWithOrdinalNumber> testPlayer = List.of(new PlayerWithOrdinalNumber(1, "E", "Y", 42));
        Mockito.when(playerRepository.findAll())
                .thenReturn(testPlayerFromDB);
        //  when
        List<PlayerWithOrdinalNumber> actual = playerService.getAllPlayers();

        //  then
        verify(playerRepository).findAll();
        Assertions.assertEquals(testPlayer, actual);
    }

    @Test
    void addNewPlayerTest() {
        // given
        DTO testPlayerWithoutId = new DTO("ATest", "BTest", 20);
        Player testPlayer =
                new Player(null, testPlayerWithoutId.firstName(), testPlayerWithoutId.lastName(), testPlayerWithoutId.age());
        DTO testPlayerWithoutIdBack =
                new DTO(testPlayerWithoutId.firstName(), testPlayerWithoutId.lastName(), testPlayerWithoutId.age());
        Mockito.when(playerRepository.insert(testPlayer))
                .thenReturn(testPlayer);

        // when
        DTO actual = playerService.addNewPlayer(testPlayerWithoutId);
        // then
        verify(playerRepository).insert(testPlayer);
        Assertions.assertEquals(testPlayerWithoutIdBack, actual);
    }
}