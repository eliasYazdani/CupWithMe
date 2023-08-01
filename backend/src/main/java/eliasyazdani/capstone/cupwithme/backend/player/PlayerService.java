package eliasyazdani.capstone.cupwithme.backend.player;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.NoSuchElementException;


@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }


    public List<Player> getAllPlayers() {
        return (playerRepository.findAll());
    }

    public Player addNewPlayer(PlayerWithoutId playerWithoutId) {
        Player newPlayerWithoutId = new Player(null,
                playerWithoutId.firstName(), playerWithoutId.lastName(), playerWithoutId.age());
        return (playerRepository.insert(newPlayerWithoutId));
    }

    public Player changePlayerInfo(PlayerWithoutId playerWithoutId, String id) {
        return (playerRepository.save(new Player(
                id, playerWithoutId.firstName(), playerWithoutId.lastName(), playerWithoutId.age())));
    }

    public Player getDetails(String id) {
        return playerRepository.findById(id).orElseThrow(() -> new NoSuchElementException(id));
    }
}
