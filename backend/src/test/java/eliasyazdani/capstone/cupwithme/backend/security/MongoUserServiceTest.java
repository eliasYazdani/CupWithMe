package eliasyazdani.capstone.cupwithme.backend.security;

import eliasyazdani.capstone.cupwithme.backend.player.IdService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
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
    void testAddNewUser_WhenUserDoesNotExist_ReturnsUsername() {
        // Given
        String userId = "someUserId";
        String username = "testUser";
        String password = "testPassword";
        String hashedPassword = "hashedPassword";

        MongoUserWithoutId newUserWithoutId = new MongoUserWithoutId(username, password);
        MongoUser newUser = new MongoUser(userId, username, hashedPassword);

        when(idService.randomId()).thenReturn(userId);
        when(passwordEncoder.encode(password)).thenReturn(hashedPassword);
        when(mongoUserRepository.insert(any(MongoUser.class))).thenReturn(newUser);

        // When
        String addedUsername = mongoUserService.addNewUser(newUserWithoutId);

        // Then
        assertEquals(username, addedUsername);
        Mockito.verify(idService).randomId();
        Mockito.verify(passwordEncoder).encode(password);
        Mockito.verify(mongoUserRepository).insert(any(MongoUser.class));
    }

    @Test
    void testAddNewUser_WhenUserAlreadyExists_ReturnsErrorMessage() {
        // Given
        String existingUsername = "existingUser";
        MongoUserWithoutId existingUserWithoutId = new MongoUserWithoutId(existingUsername, "password");
        when(mongoUserRepository.findByUsername(existingUsername)).thenReturn(Optional.of(new MongoUser("id", existingUsername, "password")));

        // When
        String result = mongoUserService.addNewUser(existingUserWithoutId);

        // Then
        assertEquals("This username is already taken", result);
    }

    @Test
    void testDoesUsernameExist_WhenUserExists_ReturnsTrue() {
        // Given
        String existingUsername = "existingUser";
        MongoUser mockUser = new MongoUser("id", existingUsername, "password");
        when(mongoUserRepository.findByUsername(existingUsername)).thenReturn(Optional.of(mockUser));

        // When
        boolean result = mongoUserService.doesUsernameExists(existingUsername);

        // Then
        assertTrue(result);
    }

    @Test
    void testDoesUsernameExist_WhenUserDoesNotExist_ReturnsFalse() {
        // Given
        String nonExistingUsername = "nonExistingUser";
        when(mongoUserRepository.findByUsername(nonExistingUsername)).thenReturn(Optional.empty());

        // When
        boolean result = mongoUserService.doesUsernameExists(nonExistingUsername);

        // Then
        assertFalse(result);
    }
}
