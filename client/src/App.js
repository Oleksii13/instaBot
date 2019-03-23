import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import "./assets/scss/blk-design-system-react.scss";
import "./assets/css/nucleo-icons.css";
import "./assets/demo/demo.css";







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
