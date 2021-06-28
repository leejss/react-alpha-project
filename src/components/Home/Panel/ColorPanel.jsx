import { Button, Divider, Menu, Sidebar } from "semantic-ui-react";

const ColorPanel = () => {
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
      <Button icon="add" size="small" color="blue" />
    </Sidebar>
  );
};

export default ColorPanel;
