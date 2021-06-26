import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import Errors from "../Common/Errors";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Validation
  const isFormValid = useCallback(() => {
    return user.email && user.password;
  }, [user.email, user.password]);

  // Event handler
  const handleChange = useCallback((e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isFormValid()) {
        setLoading(true);
        try {
          const loginUser = await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password);

          console.log("Login");
          console.log(loginUser);
          setErrors([]);
          setUser({
            email: "",
            password: "",
          });
        } catch (err) {
          setErrors((prev) => prev.concat(err));
        }
        setLoading(false);
      }
    },
    [user.email, user.password, isFormValid]
  );

  const handleInputError = useCallback((errors, inputName) => {
    return errors.some((err) => err.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  }, []);

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="at" color="violet" />
          <Header.Content>Login to alpha project</Header.Content>
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              onChange={handleChange}
              type="email"
              value={user.email}
              className={handleInputError(errors, "email")}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              type="password"
              value={user.password}
              className={handleInputError(errors, "password")}
            />

            <Button
              color="violet"
              fluid
              size="large"
              className={loading ? "loading" : ""}
              disabled={loading}
            >
              Login
            </Button>
          </Segment>
        </Form>

        {errors.length > 0 && (
          <Message error>
            <h1>Erorr</h1>
            <Errors errors={errors} />
          </Message>
        )}

        <Message>
          New to alpha ? <Link to="/register">Create account</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
