import firebase from "../firebase";

/*
    messages
        channelId
            messageId
            messageId
            ...

    type message = {
        timestamp: time
        user: User
        content: string
    }

*/

export const messagesRef = firebase.database().ref("messages");

// export const sendMessages = async (channel, imageUrl = null, content, user) => {
//   try {
//     const newMessage = {
//       user: {
//         id: user.uid,
//         name: user.displayName,
//         avatar: user.photoURL,
//       },
//       timestamp: firebase.database.ServerValue.TIMESTAMP,
//     };
//     if (imageUrl) {
//       newMessage["image"] = imageUrl;
//     } else {
//       newMessage["content"] = content;
//     }

//     await messagesRef.child(channel.id).push().set(newMessage);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const sendMessages = async (message, channelId) => {
  try {
    const ms = {
      ...message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
    await messagesRef.child(channelId).push().set(ms);
  } catch (error) {
    console.error(error);
  }
};
