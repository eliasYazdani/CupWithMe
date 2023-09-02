package eliasyazdani.capstone.cupwithme.backend.player;
import org.springframework.security.core.Authentication;
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
    public List<Player> getAllPlayersForAdmin(Authentication authentication) {
        String loggedInAdmin = authentication.getName();
        return playerService.getAllPlayersForAdmin(loggedInAdmin);
    }

    @PostMapping()
    Player addNewPlayer(@Valid @RequestBody PlayerWithoutId playerWithoutId) {
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
