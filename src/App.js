import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import Profile from "./containers/Profile/Profile";
import Header from "./containers/Shared/Header";
import Footer from "./containers/Shared/Footer";
import Chat from "./containers/Chat/Chat";
import "./assets/scss/index.scss";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
    <div className="page-wrapper">
      <Router>
        <Header />
        <main className="content">
          <div>
            <Switch>
              <Route path="/" exact component={Login} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/chat" exact component={Chat} />
            </Switch>
          </div>
        </main>
      </Router>

      <Footer />
    </div>
  );
}
