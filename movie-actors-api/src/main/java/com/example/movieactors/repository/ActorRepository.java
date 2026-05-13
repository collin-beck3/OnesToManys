package com.example.movieactors.repository; 

import com.example.movieactors.model.Actor; 
import org.springframework.data.jpa.repository.JpaRepository; 

import java.util.List; 

public interface ActorRepository extends JpaRepository<Actor, Long> {

    List<Actor> findByMovie_Id(Long movieId); 
}
