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
export const privateMessagesRef = firebase.database().ref("privateMessages");

export const sendMessages = async (message, channelId, isPrivate) => {
  try {
    const ms = {
      ...message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
    if (isPrivate) {
      await privateMessagesRef.child(channelId).push().set(ms);
    } else {
      await messagesRef.child(channelId).push().set(ms);
    }
  } catch (error) {
    console.error(error);
  }
};
