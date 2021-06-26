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
import Errors from "../Common/Errors";

const Login = ({
  user,
  loading,
  errors,
  handleChange,
  handleInputError,
  handleSubmit,
}) => {
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
          <h4>
            <Link to="/register">Create account</Link>
          </h4>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
