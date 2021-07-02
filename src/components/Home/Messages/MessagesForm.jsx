import { useCallback, useState } from "react";
import { Button, Input, Segment } from "semantic-ui-react";
import FileModalContainer from "../../../containers/Messages/FileModalContainer";

const MessagesForm = ({
  handleChange,
  addMessage,
  content,
  errors,
  loading,
  handleKeyDown
}) => {
  const [modal, setModal] = useState(false);
  const openModal = useCallback(() => {
    setModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setModal(false);
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
        onKeyDown={handleKeyDown}
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
      <FileModalContainer modal={modal} closeModal={closeModal} />
    </Segment>
  );
};

export default MessagesForm;
