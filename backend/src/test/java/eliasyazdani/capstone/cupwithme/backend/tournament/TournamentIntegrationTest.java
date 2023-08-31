package eliasyazdani.capstone.cupwithme.backend.tournament;

import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TournamentIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    TournamentRepository tournamentRepository;
    @Autowired
    IdService idService;

    @Test
    @WithMockUser
    void expectedEmptyListOnGet() throws Exception {
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/cup/tournaments")
                                .with(csrf())
                )
                .andExpect(
                        content().json("""
                                                  []
                                """)
                )
                .andExpect(status().is(200));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenAddNewTournament_thenReturnNewTournament() throws Exception {

        mockMvc.perform(
                        post("/api/cup/tournaments")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        { "admin":"adminA","tournamentName": "Bezirk2","location": "Hamburg","numberOfPlayers": 4,
                                        "matchesWithoutId":[{"player1":"","score1":0,"player2": "","score2": 0},{"player1":"","score1":0,"player2": "","score2": 0},{"player1":"","score1":0,"player2": "","score2": 0}],
                                        "champion":""}
                                        """)
                                .with(csrf())
                )
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("admin").value("adminA"))
                .andExpect(jsonPath("tournamentName").value("Bezirk2"))
                .andExpect(jsonPath("location").value("Hamburg"))
                .andExpect(jsonPath("numberOfPlayers").value(4))
                .andExpect(jsonPath("matches").isArray())
                .andExpect(jsonPath("matches", hasSize(3))) // Check the array size based on your input
                .andExpect(jsonPath("champion").isEmpty());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void expectSearchedTournament_whenGetRequestWithIdTournament() throws Exception {
        List<Match> matchInSearchedTournament = List.of(
                new Match("M1", "A", 2, "B", 1),
                new Match("M2", "C", 3, "D", 0),
                new Match("M3", "A", 2, "C", 0));
        Tournament searchedTournament = new Tournament("1A", "adminA","Bezirk1", "Hamburg", 4, matchInSearchedTournament, "A");
        tournamentRepository.insert(searchedTournament);
        String expectedTournament = """
                    {
                        "id": "1A",
                        "admin":"adminA",
                        "tournamentName": "Bezirk1",
                        "location": "Hamburg",
                        "numberOfPlayers": 4,
                        "matches":[{"id":"M1","player1":"A","score1":2,"player2": "B","score2": 1},
                                   {"id":"M2","player1":"C","score1":3,"player2": "D","score2": 0},
                                   {"id":"M3","player1":"A","score1":2,"player2": "C","score2": 0}],
                        "champion": "A"
                    }
                """;

        mockMvc.perform(get("/api/cup/tournaments/1A")
                        .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json(expectedTournament));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenExistedIdWithNewInfo_thenReturnThisIdWithNewInfo() throws Exception {
        List<Match> matchesInSearchedTournamentToUpdate = List.of(
                new Match("M1", "E", 0, "F", 2),
                new Match("M2", "G", 3, "H", 1),
                new Match("M3", "F", 2, "G", 1));
        Tournament tournamentToUpdate = new Tournament(
                "1A", "adminA","Bezirk2", "Berlin", 4, matchesInSearchedTournamentToUpdate, "F");
        tournamentRepository.insert(tournamentToUpdate);


        mockMvc.perform(put("/api/cup/tournaments/1A")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "id": "1A",
                                        "admin":"adminA",
                                        "tournamentName": "2022",
                                        "location": "Hamburg",
                                        "numberOfPlayers": 4,
                                        "matches":[{"id":"M1","player1":"A","score1":2,"player2": "B","score2": 1},
                                                   {"id":"M2","player1":"C","score1":3,"player2": "D","score2": 0},
                                                   {"id":"M3","player1":"A","score1":2,"player2": "C","score2": 0}],
                                        "champion": "A"
                                    }
                                """)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                            "id": "1A",
                            "admin":"adminA",
                            "tournamentName": "2022",
                            "location": "Hamburg",
                            "numberOfPlayers": 4,
                            "matches":[{"id":"M1","player1":"A","score1":2,"player2": "B","score2": 1},
                                       {"id":"M2","player1":"C","score1":3,"player2": "D","score2": 0},
                                       {"id":"M3","player1":"A","score1":2,"player2": "C","score2": 0}],
                            "champion": "A"
                        }
                            """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenExistId_thenDeleteAndReturnNothing() throws Exception {
        List<Match> matchesInTournamentToDelete = List.of(
                new Match("M1", "A", 2, "B", 1),
                new Match("M2", "C", 3, "D", 0),
                new Match("M3", "A", 2, "C", 0));
        Tournament tournamentToDelete = new Tournament(
                "1A", "adminA","Bezirk1", "Hamburg", 16, matchesInTournamentToDelete, "A");
        tournamentRepository.insert(tournamentToDelete);


        mockMvc.perform(
                        delete("/api/cup/tournaments/1A")
                                .with(csrf())
                )
                .andExpect(status().isOk());
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/cup/tournaments")
                ).andExpect(status().isOk())
                .andExpect(content().json("""
                            []
                        """));


    }

}
