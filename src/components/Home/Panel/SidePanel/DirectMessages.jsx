import { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";

const DirectMessages = () => {
  const [users, setUsers] = useState([]);
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" />
          Direct Messages
        </span>{" "}
        {users.length}
      </Menu.Item>
    </Menu.Menu>
  );
};

export default DirectMessages;
