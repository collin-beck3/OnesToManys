package com.example.movieactors.controller; 

import com.example.movieactors.model.Actor; 
import com.example.movieactors.repository.ActorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*; 
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.movieactors.model.Movie; 
import com.example.movieactors.repository.MovieRepository; 


import java.util.List; 

@CrossOrigin(origins = "*")
@RestController
public class ActorController {

    private final ActorRepository actorRepository; 
    private final MovieRepository movieRepository; 

    public ActorController(ActorRepository actorRepository, MovieRepository movieRepository) {
        this.actorRepository = actorRepository;
        this.movieRepository = movieRepository; 
    }
    
    @GetMapping("/actors")
    public List<Actor> getAllActors() {
        return actorRepository.findAll(); 
    }

    @GetMapping("/actors/{id}")
    public Actor getActorById(@PathVariable Long id) {
        return actorRepository.findById(id).orElse(null); 
    }

    @GetMapping("/movies/{movieId}/actors")
    public List<Actor> getActorsByMovie(@PathVariable Long movieId) {
        return actorRepository.findByMovie_Id(movieId);
    }

    @PostMapping("/actors")
    public Actor createActor(@RequestBody Actor actor) {
        return actorRepository.save(actor);
    }

    @PostMapping("/movies/{movieId}/actors")
    public Actor createActorForMovie(@PathVariable Long movieId, @RequestBody Actor actor) {
        Movie movie = movieRepository.findById(movieId).orElse(null);

        if (movie == null) {
            return null;
        }

        actor.setMovie(movie); 
        return actorRepository.save(actor); 
    }

    @PutMapping("/actors/{id}")
    public Actor updateActor(@PathVariable Long id, @RequestBody Actor actorDetails) {
        Actor actor = actorRepository.findById(id).orElse(null); 

        if (actor == null) {
            return null;
        }

        actor.setFirstName(actorDetails.getFirstName());
        actor.setLastName(actorDetails.getLastName()); 
        actor.setCharacterName(actorDetails.getCharacterName()); 
        actor.setGender(actorDetails.getGender());
        actor.setMovie(actorDetails.getMovie()); 

        return actorRepository.save(actor); 
    }

    @DeleteMapping("/actors/{id}")
    public String deleteActor(@PathVariable Long id) {
        actorRepository.deleteById(id); 
        return "Actor Deleted"; 
    }

}
