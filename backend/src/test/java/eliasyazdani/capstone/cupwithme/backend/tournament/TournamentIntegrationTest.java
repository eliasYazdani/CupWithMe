package eliasyazdani.capstone.cupwithme.backend.tournament;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TournamentIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    TournamentRepository tournamentRepository;

    @Test
    void expectedEmptyListOnGet() throws Exception {
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/cup/tournaments")
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
    void whenAddNewTournament_thenReturnNewTournament() throws Exception {
        mockMvc.perform(
                        post("/api/cup/tournaments")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"tournamentName": "2022","location": "Hamburg","numberOfPlayers": 32}
                                        """)
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"tournamentName": "2022","location": "Hamburg","numberOfPlayers": 32}
                        """
                ));


    }
}
