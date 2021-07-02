import { Grid } from "semantic-ui-react";
import ColorPanel from "./Panel/ColorPanel";
import SidePanel from "./Panel/SidePanel/SidePanel";
import MessagesContainer from "../../containers/Messages/MessagesContainer";
import MetaPanelContainer from "../../containers/MetaPanelContainer";

const Home = ({ currentUser }) => {
  return (
    <Grid columns="equal" style={{ background: "#eee" }}>
      {/* <ColorPanel /> */}
      <SidePanel currentUser={currentUser} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <MessagesContainer />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanelContainer />
      </Grid.Column>
    </Grid>
  );
};

export default Home;
