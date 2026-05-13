package com.example.movieactors.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.OneToMany; 
import jakarta.persistence.CascadeType;
import java.util.List;
import com.example.movieactors.model.Actor;

@Entity
@Table(name = "movies")
public class Movie {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    private String title;
    private String genre; 

    @Column(name = "release_year")
    private int releaseYear; 
    
    private String director;
    private String rating; 

    @Column(name = "imdb_rating")
    private double imdbRating;

    @Column(name = "duration_minutes")
    private int durationMinutes; 

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("movie")
    private List<Actor> actors; 

    public Movie() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getGenre() {
        return genre; 
    }

    public int getReleaseYear() {
        return releaseYear; 
    }

    public String getDirector() {
        return director; 
    }

    public String getRating() {
        return rating; 
    }

    public double getImdbRating() {
        return imdbRating; 
    }

    public int getDurationMinutes() {
        return durationMinutes; 
    }

    public List<Actor> getActors() {
        return actors;
    }

    public void setId(Long id) {
        this.id = id; 
    }

    public void setTitle(String title) {
        this.title = title; 
    }

    public void setGenre(String genre) {
        this.genre = genre; 
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public void setDirector(String director) {
        this.director = director; 
    }

    public void setRating(String rating) {
        this.rating = rating; 
    }

    public void setImdbRating(double imdbRating) {
        this.imdbRating = imdbRating;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes; 
    }

    public void setActors(List<Actor> actors) {
        this.actors = actors; 
    }
}
