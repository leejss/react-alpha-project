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

export const sendMessages = async (channel, content, user) => {
  console.log("sendMessages");
  try {
    const newMessage = {
      content: content,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      },
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
    console.log("new message", newMessage);
    await messagesRef.child(channel.id).push().set(newMessage);
  } catch (error) {
    console.error(error);
  }
};
