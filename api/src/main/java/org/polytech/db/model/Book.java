package org.polytech.db.model;

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
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer cnt;

    @JoinColumn(name = "type_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = BookType.class, fetch = FetchType.EAGER)
    private BookType bookType;

    @Column(name = "type_id")
    private Long typeId;
}



