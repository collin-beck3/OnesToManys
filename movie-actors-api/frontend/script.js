console.log("script.js loaded");

const movieList = document.getElementById("movieList"); 
const actorList = document.getElementById("actorList"); 

//load all movies
fetch("http://localhost:8080/movies")
    .then(response => response.json())
    .then(movies => {

        movies.forEach(movie => {
            const li = document.createElement("li");
            li.textContent = movie.title + "   (click to view actors)";
            li.style.cursor = "pointer";
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete"; 
            deleteButton.style.marginLeft = "10px"; 

            deleteButton.addEventListener("click", function(event) {
                event.stopPropagation(); 

                fetch("http://localhost:8080/movies/" + movie.id, {
                    method: "DELETE"
                })
                .then(() => {
                    alert("Movie Deleted"); 
                    location.reload();
                });
            });

            li.appendChild(deleteButton); 

            li.addEventListener("click", function () {
                console.log("Clicked movie: ", movie.id);
                loadActors(movie.id);
            });

            movieList.appendChild(li); 
        });
    })
    .catch(error => {
        console.error("Error loading movies:", error);
    });

    //load actors for selected movie
    function loadActors(movieId) {
        actorList.innerHTML = ""; 

        fetch("http://localhost:8080/movies/" + movieId + "/actors")
        .then(response => response.json())
        .then(actors => {
            console.log("Actors: ", actors);

            actors.forEach(actor => {
                const li = document.createElement("li"); 
                li.textContent = actor.firstName + " " + actor.lastName + " as " + actor.characterName;

                const deleteButton = document.createElement("button"); 
                deleteButton.textContent = "Delete"; 
                deleteButton.style.marginLeft = "10px"; 

                deleteButton.addEventListener("click", function() {
                    fetch("http://localhost:8080/actors/" + actor.id, {
                        method: "DELETE"
                    })
                    .then(() => {
                        alert("Actor Deleted"); 
                        location.reload();
                    });
                });
                li.appendChild(deleteButton); 
                
                actorList.appendChild(li); 
            });
        })
        .catch(error => {
            console.error("Error loading actors:", error); 
        });
    }

    const movieForm = document.getElementById("movieForm"); 

    movieForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newMovie = {
            title: document.getElementById("title").value, 
            genre: document.getElementById("genre").value,
            releaseYear: Number(document.getElementById("releaseYear").value), 
            director: document.getElementById("director").value,
            rating: document.getElementById("rating").value, 
            imdbRating: Number(document.getElementById("imdbRating").value),
            durationMinutes: Number(document.getElementById("durationMinutes").value)
        };

        fetch("http://localhost:8080/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMovie)
        })
        .then(response => response.json())
        .then(movie => {
            console.log("Movie Added: ", movie);
            location.reload();
        })
        .catch(error => {
            console.error("Error adding movie:", error);
        });
    });

    const actorForm = document.getElementById("actorForm");

actorForm.addEventListener("submit", function(event) {
    event.preventDefault();

    console.log("Actor form submitted");

    const movieId = document.getElementById("actorMovieId").value;

    const newActor = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        characterName: document.getElementById("characterName").value,
        gender: document.getElementById("gender").value
    };

    console.log("Movie ID:", movieId);
    console.log("New actor:", newActor);

    fetch("http://localhost:8080/movies/" + movieId + "/actors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newActor)
    })
    .then(response => {
        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }

        return response.json();
    })
    .then(actor => {
        console.log("Actor added:", actor);
        alert("Actor added!");
        location.reload();
    })
    .catch(error => {
        console.error("Error adding actor:", error);
        alert("Actor was not added. Check console.");
    });
});