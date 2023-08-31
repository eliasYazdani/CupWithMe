package eliasyazdani.capstone.cupwithme.backend.player;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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
class PlayerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    PlayerRepository playerRepository;
    @MockBean
    IdService idService;

    @Test
    @WithMockUser
    void expectEmptyListOnGet() throws Exception {

        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/cup/players")
                                .with(csrf())
                )
                //  THEN
                .andExpect(
                        content().json("""
                                                                    []
                                """

                        ))
                .andExpect(
                        status().is(200)
                );

    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenAddNewPlayer_thenReturnNewPlayer() throws Exception {
        Mockito.when(idService.randomId()).thenReturn("1A");
        mockMvc.perform(
                        post("/api/cup/players")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"admin":"adminA","firstName": "testA","lastName": "testB","age": 25}
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id":"1A","admin":"adminA","firstName": "testA","lastName": "testB","age": 25}
                        """
                ));


    }

    @DirtiesContext
    @Test
    void expectSearchedPlayer_whenGetRequestWithIdPlayer() throws Exception {
        Player searchedPlayer = new Player("1A","adminA", "M", "S", 65);
        playerRepository.insert(searchedPlayer);
        String expectedPlayer = """
                    {
                        "id": "1A",
                        "admin": "adminA",
                        "firstName": "M",
                        "lastName": "S",
                        "age": 65
                    }
                """;

        mockMvc.perform(get("/api/cup/players/1A")
                        .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json(expectedPlayer));
    }


    @DirtiesContext
    @Test
    @WithMockUser
    void whenExistedIdWithNewInfo_thenReturnThisIdWithNewInfo() throws Exception {

        Player playerToUpdate = new Player("1A","adminA", "F", "Y", 55);
        playerRepository.insert(playerToUpdate);


        mockMvc.perform(

                        put("/api/cup/players/1A")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"id": "1A","admin": "adminA","firstName": "I","lastName": "A","age": 66}
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id": "1A","admin":"adminA","firstName": "I","lastName": "A","age": 66}
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenExistId_thenDeleteAndReturnNothing() throws Exception {
        Player playerToDelete = new Player("2A","adminA", "A", "S", 29);
        playerRepository.insert(playerToDelete);


        mockMvc.perform(
                        delete("/api/cup/players/2A")
                                .with(csrf())
                )
                .andExpect(status().isOk());
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/cup/players")

                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            []
                        """));


    }
}
