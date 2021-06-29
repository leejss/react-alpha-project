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
