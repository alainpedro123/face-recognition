import React from 'react';
import Joi from 'joi-browser';
import Form from "./Form/Form";
import { getMovie, saveMovie } from '../API/moviesService'; 
import { getGenres } from '../API/moviesGenre'; 

class MovieForm extends Form{
    state = { 
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}
     };

    schema = {
       _id: Joi.string(),
       title: Joi.string().required().label('Title'),
       genreId: Joi.string().required().label('Genre'),
       numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
       dailyRentalRate: Joi.number().required().min(0).max(10).label('Daoly Rental Rate')
   };

   componentDidMount(){
       const genres = getGenres();
       this.setState({ genres });

       const movieId = this.props.match.params.id; //reading the id in the route
       if(movieId === "new");
       return;

       const movie = getMovie(movieId); // if it's not new, we get the movie with the givenID
       if(!movie) //checking for it existance
        return this.props.history.replace("/not-found");

       this.setState({ data: this.mapToViewModel(movie) }); 
   }

   mapToViewModel(movie) {// this method gets a movie object that we get from the server, and maps it to a different kind of movie that we can use in this form
    return{
        _id: movie._id,
        title: movie.title,
        genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
    };
   }

    doSubmit = () => {
        saveMovie(this.state.data);

        this.props.history.push("/movies");
    }

    render() { 
        return ( 
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}
 
export default MovieForm;

/*import React, { Component } from 'react';
import { saveMovie } from './../services/fakeMovieService';

const MovieForm = ({ match, history }) => {
return (
    <div>
        <h1>Movie Form{match.params.id}</h1>
        <button className="btn btn-primary" onClick={()=>history.push('/movies')}>Save</button>
    </div>
)
}
 
export default MovieForm;*/