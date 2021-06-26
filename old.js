const isFormEmpty = (state) => {
  for (let key in state) {
    if (!state[key]) {
      return false;
    }
  }
  return true;
};

const state = {
  usename: "test",
  email: "asd",
  password: "asd",
};

console.log(isFormEmpty(state));

// Submit to firebase
// const handleSubmit = useCallback(
//   (e) => {
//     e.preventDefault();
//     if (isFormValid()) {
//       setLoading(true);
//       firebase
//         .auth()
//         .createUserWithEmailAndPassword(user.email, user.password)
//         .then((createdUser) => {
//           console.log(createdUser.user);
//           createdUser.user
//             .updateProfile({
//               displayName: user.username,
//               photoURL: `http://gavatar.com/avatar/${md5(
//                 user.email
//               )}?d=identicon`,
//             })
//             .then(() => {
//               setLoading(false);
//             })
//             .catch((err) => {
//               console.error(err);
//               setErrors((prev) => prev.concat(err));
//               setLoading(false);
//             });
//         })
//         .catch((err) => {
//           console.error(err);
//           setErrors((prev) => prev.concat(err));
//           setLoading(false);
//         });

//       setUser({
//         username: "",
//         email: "",
//         password: "",
//         passwordConfirmation: "",
//       });
//       setErrors([]);
//     }
//   },
//   [user.email, user.password, isFormValid, user.username]
// );

// register
// import { useCallback, useState } from "react";
// import { Link } from "react-router-dom";
// import firebase from "../../firebase";
// import {
//   Grid,
//   Form,
//   Segment,
//   Button,
//   Header,
//   Message,
//   Icon,
// } from "semantic-ui-react";
// import config from "../../config";
// import md5 from "md5";
// import { saveUser } from "../../controllers/Auth";
// import Errors from "../Common/Errors";

// const Register = ({
//   user,
//   errors,
//   loading,
//   handleChange,
//   handleInputError,
//   handleSubmit,
// }) => {
//   // const [user, setUser] = useState({
//   //   username: "",
//   //   email: "",
//   //   password: "",
//   //   passwordConfirmation: "",
//   // });
//   // const [errors, setErrors] = useState([]);
//   // const [loading, setLoading] = useState(false);

//   // // Validation
//   // const isFormEmpty = useCallback(
//   //   ({ username, email, password, passwordConfirmation }) => {
//   //     return !username || !email || !password || !passwordConfirmation;
//   //   },
//   //   []
//   // );

//   // const isPasswordValid = useCallback(({ password, passwordConfirmation }) => {
//   //   if (password.length < 6 || passwordConfirmation.length < 6) {
//   //     return false;
//   //   } else if (password !== passwordConfirmation) {
//   //     return false;
//   //   }
//   //   return true;
//   // }, []);

//   // const isFormValid = useCallback(() => {
//   //   let error;
//   //   if (isFormEmpty(user)) {
//   //     error = { message: "Fill in all fields" };
//   //     setErrors((prev) => prev.concat(error));
//   //     return false;
//   //   } else if (!isPasswordValid(user)) {
//   //     // throw Error
//   //     error = { message: "Password is invalid" };
//   //     setErrors((prev) => prev.concat(error));
//   //     return false;
//   //   } else {
//   //     return true;
//   //   }
//   // }, [isFormEmpty, isPasswordValid, user]);

//   // // Event handler
//   // const handleChange = useCallback((e) => {
//   //   setUser((prevUser) => ({
//   //     ...prevUser,
//   //     [e.target.name]: e.target.value,
//   //   }));
//   // }, []);

//   // const handleSubmit = useCallback(
//   //   async (e) => {
//   //     e.preventDefault();
//   //     if (isFormValid()) {
//   //       setLoading(true);
//   //       try {
//   //         const createdUser = await firebase
//   //           .auth()
//   //           .createUserWithEmailAndPassword(user.email, user.password);

//   //         console.log(createdUser);
//   //         await createdUser.user.updateProfile({
//   //           displayName: user.username,
//   //           photoURL: `http://gravatar.com/avatar/${md5(
//   //             createdUser.user.email
//   //           )}`,
//   //         });
//   //         await saveUser(createdUser);
//   //         console.log("save user!");
//   //         setErrors([]);
//   //         setUser({
//   //           username: "",
//   //           email: "",
//   //           password: "",
//   //           passwordConfirmation: "",
//   //         });
//   //       } catch (err) {
//   //         setErrors((prev) => prev.concat(err));
//   //       }
//   //       setLoading(false);
//   //     }
//   //   },
//   //   [user.email, user.password, user.username, isFormValid]
//   // );

//   // const handleInputError = useCallback((errors, inputName) => {
//   //   return errors.some((err) => err.message.toLowerCase().includes(inputName))
//   //     ? "error"
//   //     : "";
//   // }, []);
//   return (
//     <Grid textAlign="center" verticalAlign="middle" className="app">
//       <Grid.Column style={{ maxWidth: 450 }}>
//         <Header as="h1" icon color="blue" textAlign="center">
//           <Icon name="at" color="blue" />
//           <Header.Content>Register for {config.COMPANY_NAME}</Header.Content>
//         </Header>
//         <Form size="large" onSubmit={handleSubmit}>
//           <Segment>
//             <Form.Input
//               fluid
//               name="username"
//               icon="user"
//               iconPosition="left"
//               placeholder="Username"
//               onChange={handleChange}
//               type="text"
//               value={user.username}
//               className={handleInputError(errors, "username")}
//             />
//             <Form.Input
//               fluid
//               name="email"
//               icon="mail"
//               iconPosition="left"
//               placeholder="Email"
//               onChange={handleChange}
//               type="email"
//               value={user.email}
//               className={handleInputError(errors, "email")}
//             />
//             <Form.Input
//               fluid
//               name="password"
//               icon="lock"
//               iconPosition="left"
//               placeholder="Password"
//               onChange={handleChange}
//               type="password"
//               value={user.password}
//               className={handleInputError(errors, "password")}
//             />
//             <Form.Input
//               fluid
//               name="passwordConfirmation"
//               icon="repeat"
//               iconPosition="left"
//               placeholder="Password Confirmation"
//               onChange={handleChange}
//               type="password"
//               value={user.passwordConfirmation}
//               className={handleInputError(errors, "passwordConfirmation")}
//             />

//             <Button
//               color="blue"
//               fluid
//               size="large"
//               className={loading ? "loading" : ""}
//               disabled={loading}
//             >
//               Register
//             </Button>
//           </Segment>
//         </Form>

//         {errors.length > 0 && (
//           <Message error>
//             <h1>Erorr</h1>
//             <Errors errors={errors} />
//           </Message>
//         )}

//         <Message>
//           Already registered? <Link to="/login">Login</Link>
//         </Message>
//       </Grid.Column>
//     </Grid>
//   );
// };

// export default Register;
