import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
// import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";







function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
