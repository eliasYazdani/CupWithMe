package eliasyazdani.capstone.cupwithme.backend.player;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PlayerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

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
        String actual = mockMvc.perform(
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
                ))
                .andReturn()
                .getResponse()
                .getContentAsString();


    }

}
