import { useCallback, useMemo } from "react";
import { Dropdown, Grid, Header, Icon } from "semantic-ui-react";
import config from "../../../config";
import firebase from "../../../firebase";

const UserPanel = () => {
  const handleLogout = useCallback(async () => {
    await firebase.auth().signOut();
  }, []);
  const dropdownOptions = useMemo(
    () => [
      {
        key: "user",
        text: (
          <span>
            Signed in as <strong>User</strong>
          </span>
        ),
        disabled: true,
      },
      {
        key: "avatar",
        text: <span>Change Avatar</span>,
      },
      {
        key: "logout",
        text: <span onClick={handleLogout}>Log Out</span>,
      },
    ],
    [handleLogout]
  );

  return (
    <Grid>
      <Grid.Column>
        <Grid.Row style={{ padding: "1rem", margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="at" />
            <Header.Content>{config.COMPANY_NAME}</Header.Content>
          </Header>
        </Grid.Row>

        <Header inverted style={{ padding: "0.2rem" }} as="h4">
          <Dropdown trigger={<span>User</span>} options={dropdownOptions} />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
