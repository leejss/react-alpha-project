import { useCallback, useState } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";
import mime from "mime-types";

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

const FileModal = ({ modal, closeModal, uploadFile }) => {
  const [file, setFile] = useState(null);

  const isAllowedFile = useCallback((filetype) => {
    return allowedFileTypes.includes(filetype);
  }, []);

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

  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label="File Types: jpg, png"
          name="file"
          type="file"
          onChange={handleFileChange}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={sendFile}>
          <span>
            <Icon name="checkmark" /> Upload
          </span>
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <span>
            <Icon name="remove" /> Cancel
          </span>
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;
