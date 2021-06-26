import { Link } from "react-router-dom";
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
import Errors from "../Common/Errors";

const Register = ({
  user,
  errors,
  loading,
  handleChange,
  handleInputError,
  handleSubmit,
}) => {
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="blue" textAlign="center">
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
              className={handleInputError(errors, "username")}
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
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              type="password"
              value={user.passwordConfirmation}
              className={handleInputError(errors, "passwordConfirmation")}
            />

            <Button
              color="blue"
              fluid
              size="large"
              className={loading ? "loading" : ""}
              disabled={loading}
            >
              Register
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
          <h4>
            <Link to="/login">Login</Link>
          </h4>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
