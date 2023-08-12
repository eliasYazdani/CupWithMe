package eliasyazdani.capstone.cupwithme.backend.player;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record PlayerWithoutId(
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @Positive
        int age

) {
}
