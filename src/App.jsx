import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import firebase from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./modules/user";
import Spinner from "./components/Common/Spinner";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

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
      <Route exact path="/" component={HomePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
};

export default App;
