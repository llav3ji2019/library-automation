package org.polytech.rest.client;

import org.polytech.db.model.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientRequestMapper {
    public Client mapToClientDto(ClientRequest request) {
        return Client.builder()
                .passportSeria(request.passportSeria())
                .fatherName(request.fatherName())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .passportNum(request.passportNum())
                .build();
    }
}
