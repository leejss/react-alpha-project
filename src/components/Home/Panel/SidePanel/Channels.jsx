import { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
const Channels = () => {
  const [channels] = useState([]);
  return (
    <Menu.Menu>
      <Menu.Item>
        <span>
          <Icon name="exchange" inverted />
          CHANNELS
        </span>{" "}
        ({channels.length}) <Icon name="add" />
      </Menu.Item>
    </Menu.Menu>
  );
};

export default Channels;
