import { Menu, Icon, Label } from "semantic-ui-react";
import ChannelModalContainer from "../../../../containers/Channel/ChannelModalContainer";

const Channels = ({
  channels,
  modal,
  openModal,
  closeModal,
  changeChannel,
  activeChannel,
  getNotificationCount,
}) => {
  return (
    <>
      <Menu.Item>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="exchange" inverted />
              CHANNELS
            </span>{" "}
            ({channels.length}){" "}
            <Icon
              name="add"
              style={{ cursor: "pointer" }}
              onClick={openModal}
            />
          </Menu.Item>
          {channels.length > 0 &&
            channels.map((ch) => (
              <Menu.Item
                key={ch.id}
                onClick={() => changeChannel(ch)}
                name={ch.name}
                active={activeChannel && ch.id === activeChannel.id}
              >
                {getNotificationCount(ch) && (
                  <Label color="red">{getNotificationCount(ch)}</Label>
                )}
                # {ch.name}
              </Menu.Item>
            ))}
        </Menu.Menu>
      </Menu.Item>
      <ChannelModalContainer modal={modal} closeModal={closeModal} />
    </>
  );
};

export default Channels;
