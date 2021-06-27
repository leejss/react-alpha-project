import firebase from "../firebase";

export const channelsRef = firebase.database().ref("channels");

export const addChannel = async (channel, user) => {
  try {
    // unique key
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channel.name,
      details: channel.details,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };

    return await channelsRef.child(key).update(newChannel);
  } catch (error) {
    console.error(error);
  }
};

// export const loadChannels = (setChannels) => {
//   let loaded = [];
//   channelsRef.on("child_added", (snap) => {
//     loaded.push(snap.val());
//     setChannels([...loaded]);
//     console.log("push");
//   });
// };
