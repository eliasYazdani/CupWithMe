package eliasyazdani.capstone.cupwithme.backend.player;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cup")

public class PlayerController {
    private final PlayerService playerService;


    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/players")
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping("/players")
    Player addNewPlayer(@RequestBody PlayerWithoutId playerWithoutId) {
        return playerService.addNewPlayer(playerWithoutId);
    }


}
