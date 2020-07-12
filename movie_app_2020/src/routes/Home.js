import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");

    this.setState({ movies, isLoading: false }); // ES6에서는 객체 키와 대입할 변수의 이름이 같으면 축약 가능
  };
  
  componentWillMount() {
    // 영화 데이터 로딩
    // setTimeout(() => {
    //   this.setState({isLoading: false});
    // }, 6000);
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;

    return (
      <section className="container"> 
        {isLoading ? (
          <div className="loader">
          <span className="loader__tex">Loading...</span>
        </div>
        ) : (
          <div className="movies">
          {
            movies.map((movie)=> (
              <Movie key= {movie.id} id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster={movie.medium_cover_image} genres={movie.genres}/>
              ))}
            </div>

          )}
      </section>
    )
  }

}

export default Home;
