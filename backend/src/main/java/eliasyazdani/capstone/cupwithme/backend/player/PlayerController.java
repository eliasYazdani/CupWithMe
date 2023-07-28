package eliasyazdani.capstone.cupwithme.backend.player;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cup/players")

public class PlayerController {
    private final PlayerService playerService;


    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<PlayerWithOrdinalNumber> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping
    PlayerDTO addNewPlayer(@RequestBody PlayerDTO playerWithoutId) {
        return playerService.addNewPlayer(playerWithoutId);
    }


}
