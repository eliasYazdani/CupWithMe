package eliasyazdani.capstone.cupwithme.backend.security;

import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class MongoUserServiceTest {

    @Mock
    private MongoUserRepository mongoUserRepository;

    @Mock
    private IdService idService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private MongoUserService mongoUserService;

    @BeforeEach
    public void setup() throws Exception {
        AutoCloseable closeable = MockitoAnnotations.openMocks(this);
        closeable.close();
    }


    @Test
    void testAddNewUser() {
        // Arrange
        String userId = "someUserId";
        String username = "testUser";
        String password = "testPassword";
        String hashedPassword = "hashedPassword";

        MongoUserWithoutId newUserWithoutId = new MongoUserWithoutId(username, password);
        MongoUser newUser = new MongoUser(userId, username, hashedPassword);

        when(idService.randomId()).thenReturn(userId);
        when(passwordEncoder.encode(password)).thenReturn(hashedPassword);
        when(mongoUserRepository.insert(any(MongoUser.class))).thenReturn(newUser);

        // Act
        String addedUsername = mongoUserService.addNewUser(newUserWithoutId);

        // Assert
        assertEquals(username, addedUsername);
        Mockito.verify(idService).randomId();
        Mockito.verify(passwordEncoder).encode(password);
        Mockito.verify(mongoUserRepository).insert(any(MongoUser.class));
    }
}
