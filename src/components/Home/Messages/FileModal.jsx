import { Modal, Input, Button, Icon } from "semantic-ui-react";

const FileModal = ({ modal, closeModal, sendFile, handleFileChange }) => {
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
