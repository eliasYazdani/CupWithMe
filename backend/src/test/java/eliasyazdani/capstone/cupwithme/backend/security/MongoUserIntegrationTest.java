package eliasyazdani.capstone.cupwithme.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Mock
    MongoUserService mongoUserService;
    @Autowired
    MongoUserRepository mongoUserRepository;
    @Autowired
    IdService idService;
    @Autowired
    private ObjectMapper objectMapper;


    @Test
    @DirtiesContext
    @WithMockUser(username = "test", password = "1234")
    void whenGetUserInfo_getUsername() throws Exception {
        //GIVEN

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/cup/users/me")
                        .contentType(MediaType.APPLICATION_JSON))

                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(content().string("test"));
    }

    @Test
    @WithMockUser(username = "test", password = "1234")
    void testLoginEndpoint() throws Exception {
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/cup/users/login")
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().string("test"));

    }

    @DirtiesContext
    @Test
    @WithMockUser
    void testSignupEndpoint() throws Exception {
        MongoUserWithoutId newUser = new MongoUserWithoutId("testuser", "testpassword");

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/cup/users/signup")
                                .content(objectMapper.writeValueAsString(newUser))
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().string("testuser"));
    }

    @Test
    @WithMockUser
    void testCheckUsernameExist() throws Exception {
        String usernameToCheck = "testUsername";
        boolean expectedResult = true;

        when(mongoUserService.doesUsernameExists(usernameToCheck)).thenReturn(expectedResult);


        mockMvc.perform(MockMvcRequestBuilders.get("/check-username/{username}", usernameToCheck)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/html"));
    }
}
