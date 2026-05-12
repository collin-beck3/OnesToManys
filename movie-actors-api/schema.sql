DROP TABLE IF EXISTS actors; 
DROP TABLE IF EXISTS movies; 

CREATE TABLE movies ( 
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL, 
    genre TEXT,
    release_year INTEGER, 
    director TEXT,
    rating TEXT, 
    imdb_rating DECIMAL(3,1) CHECK (imdb_rating >= 0 AND imdb_rating <= 10),
    duration_minutes INTEGER
); 

CREATE TABLE actors ( 
    id INTEGER PRIMARY KEY AUTO_INCREMENT, 
    movie_id INTEGER, 
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL, 
    chaacter_name TEXT, 
    gender TEXT, 

    CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
); 