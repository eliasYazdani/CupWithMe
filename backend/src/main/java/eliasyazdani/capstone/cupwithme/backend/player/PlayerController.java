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
    public List<PlayerWithOrdinalNumber> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping("/players")
    PlayerDTO addNewPlayer(@RequestBody PlayerDTO playerWithoutId) {
        return playerService.addNewPlayer(playerWithoutId);
    }


}
