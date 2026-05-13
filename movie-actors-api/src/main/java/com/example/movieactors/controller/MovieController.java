package com.example.movieactors.controller; 

import com.example.movieactors.model.Movie; 
import com.example.movieactors.repository.MovieRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*; 

@RestController
public class MovieController {

    private final MovieRepository movieRepository; 

    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    
    @GetMapping("/movies/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieRepository.findById(id).orElse(null); 
    }

    @PostMapping("/movies")
    public Movie createMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @PutMapping("/movies/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movieDetails) {
        Movie movie = movieRepository.findById(id).orElse(null); 

        if (movie == null) {
            return null;
        }


        movie.setTitle(movieDetails.getTitle()); 
        movie.setGenre(movieDetails.getGenre());
        movie.setReleaseYear(movieDetails.getReleaseYear()); 
        movie.setDirector(movieDetails.getDirector()); 
        movie.setRating(movieDetails.getRating()); 
        movie.setImdbRating(movieDetails.getImdbRating());
        movie.setDurationMinutes(movieDetails.getDurationMinutes()); 

        return movieRepository.save(movie); 
    }

    @DeleteMapping("/movies/{id}")
    public String deleteMovie(@PathVariable Long id) {
        movieRepository.deleteById(id); 
        return "Movie Deleted"; 
    }


}
