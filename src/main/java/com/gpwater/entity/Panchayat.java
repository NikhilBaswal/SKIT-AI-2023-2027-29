package com.gpwater.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "panchayats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Panchayat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 100)
    private String district;

    @Column(length = 100)
    private String state;

    @Column(length = 15)
    private String contactNumber;

    @Builder.Default
    @OneToMany(mappedBy = "panchayat", cascade = CascadeType.ALL)
    private List<Asset> assets = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "panchayat", cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<>();
}
