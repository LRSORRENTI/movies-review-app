import React, { useState } from "react"
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import '../src/App.css'
// Components:
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

// React bootstrap components:
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function App() {
  const [user, setUser] = useState(null);

  const login = async (user = null) => {
    setUser(user)
  }

  const logout = async () => {
    setUser(null)
  }

  return (
    <div className="App">
      <Navbar className="nav" expand="lg">
        <Navbar.Brand href="#home"><p class=" movies text-light fs-4 mt-1 ms-2" >Movie Reviews</p></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto mb-2">
            <Nav.Link>
              <Link className="link" to={"/movies"}>Movies</Link>
              </Nav.Link>
            <Nav.Link>
              {
                user ? (
                  <a onClick={logout}>Logout user</a>
                ) : (
                  <Link className="link" to={"/login"}>Login</Link>
                )
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path={["/", "/movies"]} component={MoviesList} />
        <Route path="/movies/:id/review" render={(props) => (
           <AddReview {...props} user={user} />)} />
        <Route path="/movies/:id/" render={(props) => (
          <Movie {...props} user={user}/>)} />
        <Route path="/login" render={(props) => (
          <Login {...props} login={login} />)}/>
      </Switch>

    </div>
  );
};
