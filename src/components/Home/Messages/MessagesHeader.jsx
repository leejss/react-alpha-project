import { Header, Icon, Input, Segment } from "semantic-ui-react";

const displayUsers = (num) => {
  if (num < 2) {
    return `${num} user`;
  } else {
    return `${num} users`;
  }
};

const MessagesHeader = ({
  countUsers,
  handleSearch,
  currentChannel,
  isPrivateChannel,
}) => {
  return (
    <Segment clearing>
      <Header as="h2" floated="left">
        <span>
          {`${isPrivateChannel ? "@" : "#"} ${
            currentChannel ? currentChannel.name : "Empty"
          }`}
          {!isPrivateChannel && <Icon name="star outline" />}
        </span>
        <Header.Subheader>{displayUsers(countUsers)}</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search"
          onChange={handleSearch}
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
