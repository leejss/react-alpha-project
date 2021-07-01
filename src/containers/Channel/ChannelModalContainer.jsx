import {  useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Icon, Input, Modal } from "semantic-ui-react";
import { addChannel } from "../../database/channel";

const ChannelModalContainer = ({ modal, closeModal }) => {
  const [channel, setChannel] = useState({
    name: "",
    details: "",
  });
  const [formValid, setFormValid] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setChannel({
      ...channel,
      [e.target.name]: e.target.value,
    });
  };

  const checkFormValidity = () => {
    if (channel.name && channel.details) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkFormValidity();
    try {
      if (formValid) {
        await addChannel(channel, currentUser);
        setChannel({
          name: "",
          details: "",
        });
      } else {
        alert("Write channel");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Add a Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input
              fluid
              label="Channel Name"
              name="name"
              value={channel.name}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              label="Channel Details"
              name="details"
              value={channel.details}
              onChange={handleChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <Button color="green" inverted onClick={handleSubmit}>
          <span>
            <Icon name="checkmark" /> Add
          </span>
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <span>
            <Icon name="remove" /> Remove
          </span>
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ChannelModalContainer;
