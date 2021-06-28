import { useCallback, useState } from "react";
import { Button, Input, Segment } from "semantic-ui-react";
import FileModal from "./FileModal";
import "./messages.css";

const MessagesForm = ({
  handleChange,
  addMessage,
  content,
  errors,
  loading,
}) => {
  const [modal, setModal] = useState(false);

  const openModal = useCallback(() => {
    setModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const uploadFile = useCallback((file, metadata) => {
    console.log(file, metadata);
  }, []);

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
