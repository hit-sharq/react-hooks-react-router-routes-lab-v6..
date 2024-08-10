
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        return response.json();
      })
      .then(data => setMovie(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main>
        <h1>{movie.title}</h1>
        <p>{movie.time}</p>
        {movie.genres.map((item,index)=>{
          return <span key={index}>{item}</span>
        })}
      </main>
    </>
  );
};

export default Movie;
