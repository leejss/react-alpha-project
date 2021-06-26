import { useState, useCallback } from "react";
import Register from "../components/Auth/Register";
import { saveUser } from "../controllers/Auth";
import firebase from "../firebase";
import md5 from "md5";

const RegisterContainer = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

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
    async (e) => {
      e.preventDefault();
      if (isFormValid()) {
        setLoading(true);
        try {
          const createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password);

          console.log(createdUser);
          await createdUser.user.updateProfile({
            displayName: user.username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}`,
          });
          await saveUser(createdUser);
          console.log("save user!");
        } catch (err) {
          setErrors((prev) => prev.concat(err));
        }
      }
    },
    [user.email, user.password, user.username, isFormValid]
  );

  const handleInputError = useCallback((errors, inputName) => {
    return errors.some((err) => err.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  }, []);
  return (
    <Register
      user={user}
      errors={errors}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleInputError={handleInputError}
    />
  );
};

export default RegisterContainer;
