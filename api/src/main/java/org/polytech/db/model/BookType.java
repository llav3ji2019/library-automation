package org.polytech.db.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "book_types")
@Getter
@Setter
@Builder
@EqualsAndHashCode
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Сущность типа книги", example = "12345")
public class BookType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Индетификатор типа книги", example = "13")
    private Long id;

    @Schema(description = "Название для типа книги", example = "Легендарная")
    private String name;

    @Schema(description = "Количество книг данного типа", example = "254")
    private Integer cnt;

    @Schema(description = "Штраф в дань за опоздание", example = "1000")
    private Double fine;

    @Column(name = "day_count")
    @Schema(description = "Количество дней для аренды", example = "7")
    private Integer dayCount;
}
