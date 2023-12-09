package org.polytech.db.model;

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
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "book_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = Book.class, fetch = FetchType.EAGER)
    private Book book;

    @Column(name = "book_id")
    private Long bookId;

    @JoinColumn(name = "client_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = Client.class, fetch = FetchType.EAGER)
    private Client client;

    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "date_beg")
    private LocalDate dateBeg;

    @Column(name = "date_end")
    private LocalDate dateEnd;

    @Column(name = "date_ret")
    private LocalDate dateRet;
}
