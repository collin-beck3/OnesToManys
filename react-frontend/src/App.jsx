import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);

  const [newMovie, setNewMovie] = useState({
    title: "", 
    genre: "", 
    releaseYear: "", 
    director: "", 
    rating: "", 
    imdbRating: "", 
    durationMinutes: "", 
  });

  const [selectedMovieId, setSelectedMovieId] = useState(null); 

  const [newActor, setNewActor] = useState({
    firstName: "", 
    lastName: "", 
    characterName: "", 
    gender: ""
  }); 

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  function loadActors(movieId) {
    fetch(`http://localhost:8080/movies/${movieId}/actors`)
      .then(res => res.json())
      .then(data => setActors(data));
  }

  function addMovie(event) {
    event.preventDefault();

    fetch("http://localhost:8080/movies", {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newMovie, 
        releaseYear: Number(newMovie.releaseYear), 
        imdbRating: Number(newMovie.imdbRating), 
        durationMinutes: Number(newMovie.durationMinutes)
      })
    })
    .then(response => response.json())
    .then(movie => {
      setMovies([...movies, movie]);
      setNewMovie({
        title: "",
        genre: "", 
        releaseYear: "", 
        director: "", 
        rating: "", 
        imdbRating: "", 
        durationMinutes: "", 
      });
    });
  }

  function addActor(event) {
    event.preventDefault(); 

    console.log("Adding Actor to movie:", selectedMovieId); 
    console.log("Actor:", newActor); 

    if (!selectedMovieId) {
      alert("Select a movie first!"); 
      return; 
    }

    fetch ("http://localhost:8080/movies/" + selectedMovieId + "/actors", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newActor)
    })
    .then(response => response.json())
    .then(actor => {
      console.log("Actor added:", actor);
      loadActors(selectedMovieId); 
      setNewActor({
        firstName: "", 
        lastName: "", 
        characterName: "", 
        gender: ""
      });
    });
  }

  return (
    <div> 
      <h1>Movies</h1>

      <h4>Add Movie</h4>
      <form onSubmit={addMovie}>
        <input placeholder="Title" value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})}/>
        <input placeholder="Genre" value={newMovie.genre} onChange={e => setNewMovie({...newMovie, genre: e.target.value})}/>
        <input placeholder="Release Year" value={newMovie.releaseYear} onChange={e => setNewMovie({...newMovie, releaseYear: e.target.value})}/>
        <input placeholder="Director" value={newMovie.director} onChange={e => setNewMovie({...newMovie, director: e.target.value})}/> 
        <input placeholder="Rating" value={newMovie.rating} onChange={e => setNewMovie({...newMovie, rating: e.target.value})}/>
        <input placeholder="IMDb Rating" value={newMovie.imdbRating} onChange={e => setNewMovie({...newMovie, imdbRating: e.target.value})}/>
        <input placeholder="Duration (in Minutes)" value={newMovie.durationMinutes} onChange={e => setNewMovie({...newMovie, durationMinutes: e.target.value})}/>
        <button type="submit">Add Movie</button>
      </form>


      <ul>
      {movies.map(movie => (
      <li
      key={movie.id}
      onClick={() => {
        setSelectedMovieId(movie.id);
        loadActors(movie.id);
      }}
      style={{ cursor: "pointer", marginBottom: "10px" }}
      >
      {movie.title}

      <button
        style={{ marginLeft: "10px" }}
        onClick={(e) => {
          e.stopPropagation(); // prevents triggering movie click

          fetch("http://localhost:8080/movies/" + movie.id, {
            method: "DELETE"
          }).then(() => {
            setMovies(movies.filter(m => m.id !== movie.id));
          });
        }}
      >
        Delete
      </button>
        </li>
      ))}
      </ul>

      <h2>Actors</h2>
      <h3>Add Actor</h3>

      <p>Selected Movie: {movies.find(m => m.id === selectedMovieId)?.title || "None"}</p>
      <form onSubmit={addActor}>
        <input placeholder="First Name" value={newActor.firstName} onChange={e => setNewActor({...newActor, firstName: e.target.value})}/>
        <input placeholder="Last Name" value={newActor.lastName} onChange={e => setNewActor({...newActor, lastName: e.target.value})}/> 
        <input placeholder="Character Name" value={newActor.characterName} onChange={e => setNewActor({...newActor, characterName: e.target.value})}/>
        <input placeholder="Gender" value={newActor.gender} onChange={e => setNewActor({...newActor, gender: e.target.value})}/>
        <button type="submit">Add Actor</button>
      </form>

      <ul>
  {actors.map(actor => (
    <li key={actor.id} style={{ marginBottom: "8px" }}>
      {actor.firstName} {actor.lastName} as {actor.characterName}

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => {
          fetch("http://localhost:8080/actors/" + actor.id, {
            method: "DELETE"
          }).then(() => {
            setActors(actors.filter(a => a.id !== actor.id));
          });
        }}
      >
        Delete
      </button>
      </li>
      ))}
      </ul>
    </div>
  );
}

export default App;
