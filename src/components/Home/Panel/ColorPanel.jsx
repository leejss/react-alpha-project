import { useState } from "react";
import {
  Button,
  Divider,
  Icon,
  Label,
  Menu,
  Modal,
  Sidebar,
} from "semantic-ui-react";
import { SliderPicker } from "react-color";

const ColorPanel = () => {
  const [modal, setModal] = useState(false);
  return (
    <Sidebar
      as={Menu}
      vertical
      visible
      icon="labeled"
      width="very thin"
      inverted
    >
      <Divider />
      <Button
        icon="add"
        size="small"
        color="blue"
        onClick={() => setModal(true)}
      />
      <Modal basic open={modal} onClose={() => setModal(false)}>
        <Modal.Header>Choose app color</Modal.Header>
        <Modal.Content>
          <Label content="Primary Color" />
          <SliderPicker />
          <Label content="Secondary Color" />
          <SliderPicker />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Save Colors
          </Button>
          <Button color="red" inverted onClick={() => setModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Sidebar>
  );
};

export default ColorPanel;
