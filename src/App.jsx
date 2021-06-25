import { Route, Switch } from "react-router";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "./App.css";

const App = () => {
  return (
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default App;
