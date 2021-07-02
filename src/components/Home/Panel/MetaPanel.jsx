import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
} from "semantic-ui-react";

const MetaPanel = ({
  activeIndex,
  updateIndex,
  isPrivateChannel,
  currentChannel,
  usersPosts,
}) => {
  if (isPrivateChannel || !currentChannel) return null;
  return (
    <Segment loading={!currentChannel}>
      <Header as="h3" attached="top">
        About # {currentChannel.name}
      </Header>
      <Accordion styled attached="true">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={updateIndex}
        >
          <Icon name="dropdown" />
          <Icon name="info" />
          Channel Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {currentChannel.details}
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={updateIndex}
        >
          <Icon name="dropdown" />
          <Icon name="user circle" />
          Top Posters
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <List>
            {Object.entries(usersPosts)
              .sort((a, b) => b[1] - a[1])
              .map(([key, value], i) => (
                <List.Item key={i}>
                  <Image avatar src={value.avatar} />
                  <List.Content>
                    <List.Header as="a">{key}</List.Header>
                    <List.Description>{`${
                      value.count > 1
                        ? `${value.count} posts`
                        : `${value.count} post`
                    }`}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={updateIndex}
        >
          <Icon name="dropdown" />
          <Icon name="pencil alternate" />
          Created by
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <Header as="h3">
            <Image circular src={currentChannel.createdBy.avatar} />
            {currentChannel.createdBy.name}
          </Header>
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
};

export default MetaPanel;
