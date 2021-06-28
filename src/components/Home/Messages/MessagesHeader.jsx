import { Header, Icon, Input, Segment } from "semantic-ui-react";

const MessagesHeader = () => {
  return (
    <Segment clearing>
      <Header as="h2" floated="left">
        <span>
          Channel
          <Icon name="star outline" />
        </span>
        <Header.Subheader>2 Users</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search"
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
