import { Grid } from "semantic-ui-react";
import ColorPanel from "./Panel/ColorPanel";
import Messages from "./Messages";
import MetaPanel from "./Panel/MetaPanel";
import SidePanel from "./Panel/SidePanel/SidePanel";

const Home = ({ currentUser }) => {
  return (
    <Grid columns="equal" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel currentUser={currentUser} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

export default Home;
