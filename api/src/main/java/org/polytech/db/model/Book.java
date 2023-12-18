package org.polytech.db.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Getter
@Setter
@Builder
@EqualsAndHashCode
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Сущеость книги")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Идентификатор книги", example = "1223")
    private Long id;

    @Schema(description = "Название книги", example = "Ромэо и Джульетта")
    private String name;

    @Schema(description = "Остаток книг в библиотеке")
    private Integer cnt;

    @JoinColumn(name = "type_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = BookType.class, fetch = FetchType.EAGER)
    @Schema(description = "Тип книги")
    private BookType bookType;

    @Column(name = "type_id")
    @Schema(description = "Индетификатор типа книги", example = "13")
    private Long typeId;
}



