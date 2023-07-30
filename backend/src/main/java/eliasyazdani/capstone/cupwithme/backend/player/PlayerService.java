package eliasyazdani.capstone.cupwithme.backend.player;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<PlayerWithOrdinalNumber> getAllPlayers() {
        List<Player> playerFromDB = playerRepository.findAll();
        List<PlayerWithOrdinalNumber> playerWithOrdinalNumbers = new ArrayList<>();
        int ordinalNumber = 1;
        for (Player player : playerFromDB) {
            playerWithOrdinalNumbers.add(new PlayerWithOrdinalNumber(
                    ordinalNumber, player.firstName(), player.lastName(), player.age()));
            ordinalNumber++;
        }

        return playerWithOrdinalNumbers;


    }

    public DTO addNewPlayer(DTO playerWithoutId) {
        Player newPlayerWithoutId = new Player(null,
                playerWithoutId.firstName(), playerWithoutId.lastName(), playerWithoutId.age());
        Player newPlayerBack = playerRepository.insert(newPlayerWithoutId);
        return new DTO(newPlayerBack.firstName(), newPlayerBack.lastName(), newPlayerBack.age());

    }

}
