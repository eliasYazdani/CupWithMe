package eliasyazdani.capstone.cupwithme.backend.tournament;

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
                                        {"tournamentName": "2022","location": "Hamburg","numberOfPlayers": 32}
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"tournamentName": "2022","location": "Hamburg","numberOfPlayers": 32}
                        """
                ));


    }

    @DirtiesContext
    @Test
    @WithMockUser
    void expectSearchedTournament_whenGetRequestWithIdTournament() throws Exception {
        Tournament searchedTournament = new Tournament("1A", "2022", "Hamburg", 64);
        tournamentRepository.insert(searchedTournament);
        String expectedTournament = """
                    {
                        "id": "1A",
                        "tournamentName": "2022",
                        "location": "Hamburg",
                        "numberOfPlayers": 64
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

        Tournament tournamentToUpdate = new Tournament("1A", "2022", "Berlin", 32);
        tournamentRepository.insert(tournamentToUpdate);


        mockMvc.perform(

                        put("/api/cup/tournaments/1A")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"id": "1A","tournamentName": "2023","location": "Hamburg","numberOfPlayers": 64}
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id": "1A","tournamentName": "2023","location": "Hamburg","numberOfPlayers": 64}
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenExistId_thenDeleteAndReturnNothing() throws Exception {
        Tournament tournamentToDelete = new Tournament("2A", "2022", "Hamburg", 16);
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
