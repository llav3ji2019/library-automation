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
                .id(request.id())
                .build();
    }

    public ClientRequest mapToClientRequest(Client request) {
        return ClientRequest.builder()
                .passportSeria(request.getPassportSeria())
                .fatherName(request.getFatherName())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .passportNum(request.getPassportNum())
                .id(request.getId())
                .build();
    }
}
