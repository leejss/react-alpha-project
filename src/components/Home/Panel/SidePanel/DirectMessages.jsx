import { Icon, Menu } from "semantic-ui-react";

const isUserOnline = (user) => {
  if (user["status"] === "online") {
    return true;
  } else {
    return false;
  }
};

const DirectMessages = ({ users, changePrivateChannel, activeChannel }) => {
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" />
          Direct Messages
        </span>{" "}
        {users.length}
      </Menu.Item>
      {users.map((user) => (
        <Menu.Item
          key={user.uid}
          onClick={() => changePrivateChannel(user)}
          active={user.uid === activeChannel}
        >
          <Icon name="circle" color={isUserOnline(user) ? "green" : "red"} />@{" "}
          {user.name}
        </Menu.Item>
      ))}
    </Menu.Menu>
  );
};

export default DirectMessages;
