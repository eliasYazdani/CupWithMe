package eliasyazdani.capstone.cupwithme.backend;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReactRoutingForwardingTest {

    @Mock
    private Resource location;

    @InjectMocks
    private ReactRoutingForwarding.ReactRoutingPathResourceResolver resolver;


    @Test
    void testGetResourceNonExistingFile() throws IOException {
        // Mock the behavior of the location.createRelative() method
        Resource requestedResource = new ClassPathResource("static/non-existing-file.txt");
        when(location.createRelative(any())).thenReturn(requestedResource);

        // Call the method being tested
        Resource result = resolver.getResource("non-existing-file.txt", location);

        // Verify that the method returned the default starting page resource
        assertEquals(new ClassPathResource(ReactRoutingForwarding.DEFAULT_STARTING_PAGE), result);
    }

    @Test
    void testGetResourceFrontendRouting() throws IOException {
        // Mock the behavior of the location.createRelative() method
        Resource requestedResource = new ClassPathResource("static/frontend-routing");
        when(location.createRelative(any())).thenReturn(requestedResource);

        // Call the method being tested
        Resource result = resolver.getResource("frontend-routing", location);

        // Verify that the method returned the default starting page resource
        assertEquals(new ClassPathResource(ReactRoutingForwarding.DEFAULT_STARTING_PAGE), result);
    }
}