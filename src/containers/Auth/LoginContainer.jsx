import { useState, useCallback } from "react";
import Login from "../../components/Auth/Login";
import firebase from "../../firebase";

const LoginContainer = () => {
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
          await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password);
        } catch (err) {
          setErrors((prev) => prev.concat(err));
        }
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
    <Login
      user={user}
      loading={loading}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleInputError={handleInputError}
    />
  );
};

export default LoginContainer;
