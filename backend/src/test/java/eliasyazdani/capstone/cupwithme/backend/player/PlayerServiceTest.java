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
        List<Player> testPlayer = List.of(new Player("1", "E", "Y", 42));
        Mockito.when(playerRepository.findAll())
                .thenReturn(testPlayer);
        //  when
        List<Player> actual = playerService.getAllPlayers();
        //  then
        verify(playerRepository).findAll();
        Assertions.assertEquals(testPlayer, actual);
    }
}