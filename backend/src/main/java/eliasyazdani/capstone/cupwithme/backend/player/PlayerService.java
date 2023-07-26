package eliasyazdani.capstone.cupwithme.backend.player;

import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    public PlayerService(PlayerRepository playerRepository){
        this.playerRepository= playerRepository;
    }
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
}
