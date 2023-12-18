package org.polytech.db.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clients")
@Getter
@Setter
@Builder
@EqualsAndHashCode
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Сущность клиента", example = "12345")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Индетификатор для читателя", example = "123")
    private Long id;

    @Column(name = "first_name")
    @Schema(description = "Имя читателя", example = "Олег")
    private String firstName;

    @Column(name = "last_name")
    @Schema(description = "Фамилия читателя", example = "Попов")
    private String lastName;

    @Column(name = "pather_name")
    @Schema(description = "Отчество читателя", example = "Александрович")
    private String fatherName;

    @Column(name = "passport_seria")
    @Schema(description = "Серия паспорта читателя", example = "1234")
    private String passportSeria;

    @Column(name = "passport_num")
    @Schema(description = "Номер паспорта читателя", example = "123456")
    private String passportNum;
}
