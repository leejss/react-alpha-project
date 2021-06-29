import firebase from "../firebase";

const usersRef = firebase.database().ref("users");

export const saveUser = async (createdUser) => {
  try {
    await usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  } catch (error) {
    console.error(error);
  }
};
