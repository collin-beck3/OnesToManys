import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);

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

  return (
    <div>
      <h1>Movies</h1>

      <ul>
        {movies.map(movie => (
          <li key={movie.id} onClick={() => loadActors(movie.id)} style={{cursor: "pointer"}}>
            {movie.title}
          </li>
        ))}
      </ul>

      <h2>Actors</h2>
      <ul>
        {actors.map(actor => (
          <li key={actor.id}>
            {actor.firstName} {actor.lastName} as {actor.characterName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
