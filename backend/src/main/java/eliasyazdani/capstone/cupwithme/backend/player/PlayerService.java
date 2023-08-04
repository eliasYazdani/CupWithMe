package eliasyazdani.capstone.cupwithme.backend.player;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final IdService idService;


    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player addNewPlayer(PlayerWithoutId playerWithoutId) {
        Player newPlayer = new Player(
                idService.randomId(),
                playerWithoutId.firstName(),
                playerWithoutId.lastName(),
                playerWithoutId.age());
        playerRepository.insert(newPlayer);
        return newPlayer;
    }

    public Player changePlayerInfo(String id,PlayerWithoutId playerWithoutId) {
        Player newChangedPlayer = new Player(
                id,
                playerWithoutId.firstName(),
                playerWithoutId.lastName(),
                playerWithoutId.age());
        return playerRepository.save(newChangedPlayer);
    }


    public Player getDetailsById(String id) {
        Optional<Player> foundPlayer = playerRepository.findById(id);
        if (foundPlayer.isPresent()) {
            return foundPlayer.get();
        } else {
            throw new NoSuchElementException();
        }

    }

    public List<Player> deletePlayer(String id) {
        if (!playerRepository.existsById(id)) {
            throw new NoSuchElementException();
        }
        playerRepository.deleteById(id);
        return playerRepository.findAll();
    }

}
