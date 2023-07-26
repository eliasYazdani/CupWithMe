package eliasyazdani.capstone.cupwithme.backend.player;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;



@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    public PlayerService(PlayerRepository playerRepository){
        this.playerRepository= playerRepository;
    }
    public ResponseEntity<List<PlayerWithOrdinalNumber>> getAllPlayers() {
      List<Player> playerFromDB = playerRepository.findAll();
      List<PlayerWithOrdinalNumber> playerWithOrdinalNumbers = new ArrayList<>();
      for(int i = 0; i<playerFromDB.size();i++){
          Player player = playerFromDB.get(i);
          playerWithOrdinalNumbers.add(new PlayerWithOrdinalNumber(
                  i+1, player.firstName(), player.lastName(), player.age()));
      }
return ResponseEntity.ok(playerWithOrdinalNumbers);



    }
}
