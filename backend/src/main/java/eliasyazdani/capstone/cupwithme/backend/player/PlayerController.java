package eliasyazdani.capstone.cupwithme.backend.player;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cup/players/")

public class PlayerController {
    private final PlayerService playerService;


    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping()
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping()
    Player addNewPlayer(@RequestBody PlayerWithoutId playerWithoutId) {
        return playerService.addNewPlayer(playerWithoutId);
    }

   //@GetMapping("{id}")
   //public Player getDetails(@PathVariable String id){
   //    return playerService.getDetails(id);
   //}

    @PutMapping("{id}")
    public Player changePlayerInfo(@PathVariable String id,@Valid @RequestBody PlayerWithoutId playerWithoutId){
        return playerService.changePlayerInfo(playerWithoutId,id);
    }



}
