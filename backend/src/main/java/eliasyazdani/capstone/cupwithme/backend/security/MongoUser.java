package eliasyazdani.capstone.cupwithme.backend.security;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public record MongoUser(
        @Id
        String id,
        @NotBlank
        @Size(min = 6, max = 120)

        String username,
        @NotBlank
        @Size(min = 6, max = 120)
        String password
) {
}
