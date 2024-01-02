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
      <div className="navbar-wrap" style={{}}>
      <Navbar className="nav" expand="lg">
        <Navbar.Brand href="#home"><p class=" movies fs-4 mt-1 ms-2" >Movie Reviews</p></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="fa-bars"/>
        <Navbar.Collapse className="bars" id="basic-navbar-nav">
          <Nav className="mr-auto mb-2">
          <div className="wrap1" style={{display: "flex", justifyContent: "center"}}>
            <Nav.Link className="movie-nav" style={{ width: "100px", borderRadius: "7px", display:"flex", justifyContent: "center", fontWeight: "700", marginBottom: "5px", marginRight: "15px"}}>
              <Link className="link" to={"/movies"}>Movies</Link>
              </Nav.Link>
              </div>
              <div className="wrap1" style={{display: "flex", justifyContent: "center"}}>
            <Nav.Link className="login-nav" style={{ width: "100px", borderRadius: "7px", display:"flex", justifyContent: "center", fontWeight: "700", marginBottom: "5px", marginRight: "15px"}}>
              {
                user ? (
                  <a className="a-nav" style={{color: "#d1a41a", textDecoration: "none"}}onClick={logout}>Logout</a>
                ) : (
                  <Link className="link" to={"/login"}>Login</Link>
                )
              }
            </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
      <div className="marquee">
      <div class="bulb" id="bulb1"></div>
      <div class="bulb" id="bulb2"></div>
      <div class="bulb" id="bulb3"></div>
      <div class="bulb" id="bulb4"></div>
      <div class="bulb" id="bulb5"></div>
      <div class="bulb" id="bulb6"></div>
      <div class="bulb" id="bulb7"></div>
      <div class="bulb" id="bulb8"></div>
      <div class="bulb" id="bulb9"></div>
      <div class="bulb" id="bulb10"></div>
      <div class="bulb" id="bulb11"></div>
      <div class="bulb" id="bulb12"></div>
      <div class="bulb" id="bulb13"></div>
      <div class="bulb" id="bulb14"></div>
      <div class="bulb" id="bulb15"></div>
      <div class="bulb" id="bulb16"></div>
      <div class="bulb" id="bulb17"></div>
      <div class="bulb" id="bulb18"></div>
      <div class="bulb" id="bulb19"></div>
      <div class="bulb" id="bulb20"></div>
      <div class="bulb" id="bulb21"></div>
      <div class="bulb" id="bulb22"></div>
      </div>
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
