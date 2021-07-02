import { Menu, Icon } from "semantic-ui-react";

const Starred = ({ starredChannels, activeChannel, changeChannel }) => {
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="star" inverted />
          STARRED
        </span>{" "}
        ({starredChannels.length}){" "}
      </Menu.Item>
      {starredChannels.length > 0 &&
        starredChannels.map((ch) => (
          <Menu.Item
            key={ch.id}
            onClick={() => changeChannel(ch)}
            name={ch.name}
            // active={activeChannel && ch.id === activeChannel.id}
          >
            # {ch.name}
          </Menu.Item>
        ))}
    </Menu.Menu>
  );
};

export default Starred;
