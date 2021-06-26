import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/Auth/Login";
import "./App.css";
import { useEffect } from "react";
import firebase from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./modules/user";
import Spinner from "./components/Common/Spinner";
import Home from "./components/Home/Home";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user signed in
        dispatch(setUser(user));
        history.push("/");
      } else {
        dispatch(clearUser());
        history.replace("/login");
      }
    });
  }, [history, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default App;
