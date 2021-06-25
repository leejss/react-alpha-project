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
import config from "../../config";

const Errors = ({ errors }) => {
  return (
    <>
      {errors.map((err, idx) => (
        <p key={idx}>{err.message}</p>
      ))}
    </>
  );
};

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState([]);

  // Validation
  const isFormEmpty = useCallback(
    ({ username, email, password, passwordConfirmation }) => {
      return !username || !email || !password || !passwordConfirmation;
    },
    []
  );

  const isPasswordValid = useCallback(({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    }
    return true;
  }, []);

  const isFormValid = useCallback(() => {
    let error;
    if (isFormEmpty(user)) {
      error = { message: "Fill in all fields" };
      setErrors((prev) => prev.concat(error));
      return false;
    } else if (!isPasswordValid(user)) {
      // throw Error
      error = { message: "Password is invalid" };
      setErrors((prev) => prev.concat(error));
      return false;
    } else {
      return true;
    }
  }, [isFormEmpty, isPasswordValid, user]);

  // Event handler
  const handleChange = useCallback((e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  }, []);
  const handleSubmit = useCallback(
    (e) => {
      if (isFormValid()) {
        e.preventDefault();
        firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((createdUser) => console.log(createdUser))
          .catch((err) => console.error(err));

        setUser({
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        });
      }
    },
    [user.email, user.password, isFormValid]
  );
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="blue" textAlign="center">
          <Icon name="at" color="blue" />
          <Header.Content>Register for {config.COMPANY_NAME}</Header.Content>
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              type="text"
              value={user.username}
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              onChange={handleChange}
              type="email"
              value={user.email}
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
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              type="password"
              value={user.passwordConfirmation}
            />

            <Button color="blue" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>

        {errors.length > 0 && (
          <Message error>
            <Errors errors={errors} />
          </Message>
        )}

        <Message>
          Already registered? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
