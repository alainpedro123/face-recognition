import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MoviesApp from './MoviesApp';
import MovieForm from './MovieForm';
import NotFound from "./NotFound";

class App extends Component {
  render() {
    return (
      <div>
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={MoviesApp} />
            <Route path="/not-found" component={NotFound}/>
            <Redirect from="/" exact to="/movies"/>
            <Redirect to="/not-found"/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App