package eliasyazdani.capstone.cupwithme.backend.player;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cup/players")

public class PlayerController {
    private final PlayerService playerService;


    @GetMapping()
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping()
    Player addNewPlayer(@RequestBody PlayerWithoutId playerWithoutId) {
        return playerService.addNewPlayer(playerWithoutId);
    }

    @GetMapping("/{id}")
    public Player getDetails(@PathVariable String id) {
        return playerService.getDetailsById(id);
    }

    @PutMapping("/{id}")
    public Player changePlayerInfo(@PathVariable String id, @Valid @RequestBody PlayerWithoutId playerWithoutId) {
        return playerService.changePlayerInfo(id, playerWithoutId);
    }

    @DeleteMapping("/{id}")
    public List<Player> deletePlayer(@PathVariable String id) {
        return playerService.deletePlayer(id);
    }


}
