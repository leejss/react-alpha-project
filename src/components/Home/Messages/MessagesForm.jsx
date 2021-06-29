import { useCallback, useState } from "react";
import { Button, Input, Segment } from "semantic-ui-react";
import FileModal from "./FileModal";
import "./messages.css";
import { v4 } from "uuid";
import { getFileExtension } from "../../../utils";
import { storageRef } from "../../../database/storage";
import { sendMessages } from "../../../database/messages";

const MessagesForm = ({
  handleChange,
  addMessage,
  content,
  errors,
  loading,
  currentUser,
  currentChannel,
}) => {
  const [modal, setModal] = useState(false);

  const openModal = useCallback(() => {
    setModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const [uploadState, setUploadState] = useState({
    state: "wait",
    progress: 0,
  });
  const [uploadErrors, setUploadErrors] = useState([]);

  const uploadFile = useCallback(
    (file, metadata) => {
      const filePath = `chat/public/${v4()}.${getFileExtension(file.type)}`;
      const uploadTask = storageRef.child(filePath).put(file, metadata);
      uploadTask.on(
        "state_changed",
        (snap) => {
          let progress = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          console.log(`bytesTransferred`, snap.bytesTransferred);
          setUploadState({
            ...uploadState,
            progress,
          });

          switch (snap.state) {
            case "paused":
              setUploadState({
                ...uploadState,
                state: "paused",
              });
              break;
            case "running":
              setUploadState({
                ...uploadState,
                state: "running",
              });
              break;
            default:
              break;
          }
        },
        (err) => {
          // error handle
          console.error(err);
          setUploadState({
            ...uploadState,
            state: "error",
          });
          setUploadErrors((prev) => prev.concat(err));
        },
        // upload complete
        () => {
          setUploadState({
            ...uploadState,
            state: "done",
          });
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadUrl) => {
              // sendMessage with image
              const message = {
                image: downloadUrl,
                user: {
                  id: currentUser.uid,
                  name: currentUser.displayName,
                  avatar: currentUser.photoURL,
                },
              };
              sendMessages(message, currentChannel.id)
                .then(() => {
                  console.log("send image");
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              setUploadErrors((prev) => prev.concat(err));
            });
        }
      );
    },
    [uploadState, currentChannel, currentUser]
  );

  return (
    <Segment className="messages__form">
      <Input
        style={{
          marginBottom: "1em",
        }}
        fluid
        name="content"
        value={content}
        disabled={loading}
        label={<Button icon="add" />}
        labelPosition="left"
        placeholder="write your message"
        onChange={handleChange}
        className={errors.length > 0 ? "error" : ""}
      />
      <Button.Group icon widths="2">
        <Button
          content="Add reply"
          color="orange"
          icon="edit"
          labelPosition="left"
          className={loading ? "loading" : ""}
          onClick={addMessage}
        />
        <Button
          content="Upload media"
          color="teal"
          icon="cloud upload"
          labelPosition="right"
          onClick={openModal}
        />
      </Button.Group>
      <FileModal
        modal={modal}
        closeModal={closeModal}
        uploadFile={uploadFile}
      />
    </Segment>
  );
};

export default MessagesForm;
