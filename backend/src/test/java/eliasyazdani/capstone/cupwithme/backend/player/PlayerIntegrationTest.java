package eliasyazdani.capstone.cupwithme.backend.player;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PlayerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    PlayerRepository playerRepository;

    @Test
    void expectEmptyListOnGet() throws Exception {
        //  GIVEN
        //  WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/cup/players")
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
    void whenAddNewPlayer_thenReturnNewPlayer() throws Exception {
        mockMvc.perform(
                        post("/api/cup/players")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"firstName": "testA","lastName": "testB","age": 25}
                                        """)
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"firstName": "testA","lastName": "testB","age": 25}
                        """
                ));


    }

    @DirtiesContext
    @Test
    void whenExistedIdWithNewInfo_thenReturnThisIdWithNewInfo() throws Exception {

        Player playerTOUpdate = new Player("1A", "F", "Y", 55);
        playerRepository.insert(playerTOUpdate);


        mockMvc.perform(

                        put("/api/cup/players/1A")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"id": "1A","firstName": "I","lastName": "A","age": 66}
                                        """)
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id": "1A","firstName": "I","lastName": "A","age": 66}
                        """));
    }

}
