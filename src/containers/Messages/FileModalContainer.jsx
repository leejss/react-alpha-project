import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import FileModal from "../../components/Home/Messages/FileModal";
import { sendMessages } from "../../database/messages";
import { storageRef } from "../../database/storage";
import { getFileExtension } from "../../utils";
import mime from "mime-types";

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

const FileModalContainer = ({ modal, closeModal }) => {
  const [uploadState, setUploadState] = useState({
    state: "wait",
    progress: 0,
  });
  const [file, setFile] = useState(null);
  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);

  const isAllowedFile = useCallback((filetype) => {
    return allowedFileTypes.includes(filetype);
  }, []);

  const { currentChannel, isPrivateChannel } = useSelector(
    (state) => state.channel
  );
  const { currentUser } = useSelector((state) => state.user);

  const uploadFile = useCallback(
    (file, metadata) => {
      const filePath = `chat/${
        isPrivateChannel ? `private-${currentChannel.id}` : "public"
      }/${v4()}.${getFileExtension(file.type)}`;
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
              sendMessages(message, currentChannel.id, isPrivateChannel)
                .then(() => {
                  console.log("send image");
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      );
    },
    [uploadState, currentChannel, currentUser, isPrivateChannel]
  );

  const sendFile = useCallback(() => {
    if (file && isAllowedFile(file.type)) {
      console.log("send file");
      const metadata = {
        contentType: mime.lookup(file.name),
      };
      uploadFile(file, metadata);
      closeModal();
      setFile(null);
    }
  }, [file, uploadFile, isAllowedFile, closeModal]);

  return (
    <FileModal
      handleFileChange={handleFileChange}
      modal={modal}
      closeModal={closeModal}
      sendFile={sendFile}
    />
  );
};

export default FileModalContainer;
