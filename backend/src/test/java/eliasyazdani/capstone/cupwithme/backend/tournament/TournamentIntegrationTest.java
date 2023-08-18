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
                                        {"tournamentName": "Bezirk2","location": "Hamburg","numberOfPlayers": 2,
                                        "matchWithoutId":{"player1":"","score1":0,"player2": "","score2": 0}}
                                        """)
                                .with(csrf())
                )
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("tournamentName").value("Bezirk2"))
                .andExpect(jsonPath("location").value("Hamburg"))
                .andExpect(jsonPath("numberOfPlayers").value(2))
                .andExpect(jsonPath("match.id").isNotEmpty())
                .andExpect(jsonPath("match.player1").value(""))
                .andExpect(jsonPath("match.score1").value(0))
                .andExpect(jsonPath("match.player2").value(""))
                .andExpect(jsonPath("match.score2").value(0));

    }

    @DirtiesContext
    @Test
    @WithMockUser
    void expectSearchedTournament_whenGetRequestWithIdTournament() throws Exception {
        Match matchInSearchedTournament = new Match("M1", "E Y", 3, "L S", 2);
        Tournament searchedTournament = new Tournament("1A", "2022", "Hamburg", 64, matchInSearchedTournament);
        tournamentRepository.insert(searchedTournament);
        String expectedTournament = """
                    {
                        "id": "1A",
                        "tournamentName": "2022",
                        "location": "Hamburg",
                        "numberOfPlayers": 64,
                        "match":{"id":"M1","player1":"E Y","score1":3,"player2": "L S","score2": 2}
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
        Match matchToUpdate = new Match("M1", "", 0, "", 0);
        Tournament tournamentToUpdate = new Tournament(
                "1A", "Bezirk2", "Berlin", 2, matchToUpdate);
        tournamentRepository.insert(tournamentToUpdate);


        mockMvc.perform(

                        put("/api/cup/tournaments/1A")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"id": "1A","tournamentName": "Bezirk1","location": "Hamburg","numberOfPlayers": 2,
                                        "match":{"id":"M1","player1":"E Y","score1":3,"player2": "L S","score2": 2}}
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id": "1A","tournamentName": "Bezirk1","location": "Hamburg","numberOfPlayers": 2,
                                        "match":{"id":"M1","player1":"E Y","score1":3,"player2": "L S","score2": 2}}
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenExistId_thenDeleteAndReturnNothing() throws Exception {
        Match matchInTournamentToDelete = new Match("M1", "E Y", 3, "L S", 2);
        Tournament tournamentToDelete = new Tournament("2A", "2022", "Hamburg", 16, matchInTournamentToDelete);
        tournamentRepository.insert(tournamentToDelete);


        mockMvc.perform(
                        delete("/api/cup/tournaments/2A")
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
