package org.polytech.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                title = "Library Automation System Api",
                description = "Library Automation System", version = "1.0.0",
                contact = @Contact(
                        name = "Emelyanov Pavel",
                        email = "pavel@emelyanov.dev",
                        url = "https://pavel.emelyanov.dev"
                )
        )
)
public class OpenApiConfiguration {

}
