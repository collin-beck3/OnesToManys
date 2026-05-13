package com.example.movieactors.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties; 

@Entity
@Table(name = "actors")
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    private String firstName;
    private String lastName;
    private String characterName; 
    private String gender; 

    @ManyToOne
    @JoinColumn(name = "movie_id")
    @JsonIgnoreProperties("actors")
    private Movie movie; 

    public Actor() {}

    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getCharacterName() { return characterName; }
    public String getGender() { return gender; }
    public Movie getMovie() { return movie; }

    public void setId(Long id) { this.id = id; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setCharacterName(String characterName) { this.characterName = characterName; }
    public void setGender(String gender) { this.gender = gender; }
    public void setMovie(Movie movie) { this.movie = movie; }

}
