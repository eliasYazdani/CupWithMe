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
    DTO addNewPlayer(@RequestBody DTO playerWithoutId) {
        return playerService.addNewPlayer(playerWithoutId);
    }


}
