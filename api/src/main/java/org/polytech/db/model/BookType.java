package org.polytech.db.model;

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
public class BookType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer cnt;

    private Double fine;

    @Column(name = "day_count")
    private Integer dayCount;
}
