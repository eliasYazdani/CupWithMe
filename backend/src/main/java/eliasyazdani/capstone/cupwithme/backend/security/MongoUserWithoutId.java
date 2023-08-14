package eliasyazdani.capstone.cupwithme.backend.security;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MongoUserWithoutId(
        @NotBlank
        @Size(min = 6, max = 120)

        String username,
        @NotBlank
        @Size(min = 6, max = 120)
        String password
) {
}
