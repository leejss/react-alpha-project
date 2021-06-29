import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

const Channels = ({
  channels,
  modal,
  openModal,
  closeModal,
  handleChange,
  handleSubmit,
  channel,
  changeChannel,
  activeChannel,
}) => {
  return (
    <Menu.Item>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="exchange" inverted />
            CHANNELS
          </span>{" "}
          ({channels.length}){" "}
          <Icon name="add" style={{ cursor: "pointer" }} onClick={openModal} />
        </Menu.Item>
        {channels.length > 0 &&
          channels.map((ch) => (
            <Menu.Item
              key={ch.id}
              onClick={() => changeChannel(ch)}
              name={ch.name}
              active={activeChannel && ch.id === activeChannel.id}
            >
              # {ch.name}
            </Menu.Item>
          ))}
      </Menu.Menu>

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
    </Menu.Item>
  );
};

export default Channels;
