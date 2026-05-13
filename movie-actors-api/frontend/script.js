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
                actorList.appendChild(li); 
            });
        })
        .catch(error => {
            console.error("Error loading actors:", error); 
        });
    }