package org.polytech.db.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@EqualsAndHashCode
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Сущность записи журнала", example = "12345")
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Индетификатор записи журнала", example = "12345")
    private Long id;

    @JoinColumn(name = "book_id", insertable = false, updatable = false)
    @Schema(description = "Книга")
    @ManyToOne(targetEntity = Book.class, fetch = FetchType.EAGER)
    private Book book;

    @Column(name = "book_id")
    @Schema(description = "Индетификатор книги", example = "12345")
    private Long bookId;

    @JoinColumn(name = "client_id", insertable = false, updatable = false)
    @Schema(description = "Клиент")
    @ManyToOne(targetEntity = Client.class, fetch = FetchType.EAGER)
    private Client client;

    @Column(name = "client_id")
    @Schema(description = "Индетификатор клиента", example = "12345")
    private Long clientId;

    @Column(name = "date_beg")
    @Schema(description = "Дата начало аренды книги", example = "2023-01-05")
    private LocalDate dateBeg;

    @Column(name = "date_end")
    @Schema(description = "Дата окончания аренды книги", example = "2023-01-06")
    private LocalDate dateEnd;

    @Column(name = "date_ret")
    @Schema(description = "Дата возврата книги", example = "2023-01-05")
    private LocalDate dateRet;
}
