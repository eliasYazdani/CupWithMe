package eliasyazdani.capstone.cupwithme.backend.player;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class PlayerServiceTest {
    PlayerRepository playerRepository = mock(PlayerRepository.class);
    IdService idService= mock(IdService.class);
    PlayerService playerService = new PlayerService(playerRepository,idService);

    @Test
    void getAllPlayersTest() {
        //  given
        List<Player> testPlayerFromDB = List.of(new Player("a1", "E", "Y", 42),
                                                new Player("a2","I","S",35));
        //List<PlayerWithOrdinalNumber> testPlayer = List.of(new PlayerWithOrdinalNumber(1, "E", "Y", 42));
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



        // when
        Mockito.when(idService.randomId()).thenReturn("1A");
        Mockito.when(playerRepository.insert(testPlayer))
                .thenReturn(testPlayer);
        Player actual = playerService.addNewPlayer(testPlayerWithoutId);
        // then
        verify(playerRepository).insert(testPlayer);
        Assertions.assertEquals(testPlayer, actual);
    }

    @Test
    void getDetailsByIdTest(){
      // Given
        Optional<Player> expected = Optional.of(
              new Player("1a","P","Y",46));
        String idToFind="1a";
       // When
       when(playerRepository.findById(idToFind)).thenReturn(expected);
        Player actual = playerService.getDetailsById(idToFind);

        // Then
        Assertions.assertEquals(expected.get(),actual);
    }

     @Test
     void changePlayerInfoTest(){
         // Given
         PlayerWithoutId newPlayerInfoWithoutID = new PlayerWithoutId("A","B",28);
         String idToUpdate="1A";
         Player  newPlayerInfo = new Player(
                 idToUpdate,
                 newPlayerInfoWithoutID.firstName(),
                 newPlayerInfoWithoutID.lastName(),
                 newPlayerInfoWithoutID.age());



         // When
         Mockito.when(playerRepository.save(newPlayerInfo)).thenReturn(newPlayerInfo);
         Player actual = playerService.changePlayerInfo(idToUpdate, newPlayerInfoWithoutID);
         // Then
         Assertions.assertEquals(newPlayerInfo,actual);

     }
}