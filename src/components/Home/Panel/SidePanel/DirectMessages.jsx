import { useCallback, useEffect, useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { getUsers, userRef } from "../../../../database/users";

const DirectMessages = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  const addFirebaseListener = useCallback(() => {
    // get users
    let loaded = [];
    userRef.on("child_added", (snap) => {
      if (currentUser.uid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";
        loaded.push(user);
        setUsers([...loaded]);
      }
    });
  }, [currentUser.uid]);
  console.log(users);

  useEffect(() => {
    addFirebaseListener();
  }, [addFirebaseListener]);

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
