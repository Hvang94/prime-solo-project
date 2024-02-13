import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Home from "../Home/Home";
import AboutMe from "../AboutMe/AboutMe";
import Services from "../Services/Services";
import Confirmation from "../Confirmation/Confirmation";
import ClientAppointment from "../ClientAppointment/ClientAppointment.jsx";
import AdminAppointment from "../AdminAppointment/AdminAppointment.jsx";
// import InfoPage from '../InfoPage/InfoPage';
// import LandingPage from '../LandingPage/LandingPage';
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const isAdmin = user.admin;

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />
          <Route
            // shows Aboutme at all times (logged in or not)
            exact
            path="/home"
          >
            <Home />
          </Route>
          {/* Visiting localhost:5173/about will show the about page. */}
          {/* <Route
            // shows Aboutme at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutMe />
          </Route> */}
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <Route
            // logged in shows UserPage else shows LoginPage
            exact
            path="/Services"
          >
            <Services />
          </Route>
          <Route exact path="/Confirmation">
            <Confirmation />
          </Route>

          {isAdmin === true ? (
            <ProtectedRoute>
              <Route exact path="/AdminAppointment">
                <AdminAppointment />
              </Route>
            </ProtectedRoute>
          ) : (
            <ProtectedRoute>
              <Route exact path="/ClientAppointment">
                <ClientAppointment />
              </Route>
            </ProtectedRoute>
          )}

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>
          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>
          {/* <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route> */}
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
