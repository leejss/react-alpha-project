import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Modal,
} from "semantic-ui-react";
import AvatarEditor from "react-avatar-editor";
import config from "../../../../config";
import firebase from "../../../../firebase";
import { storageRef } from "../../../../database/storage";
import { usersRef } from "../../../../database/users";

const UserPanel = ({ currentUser }) => {
  const handleLogout = useCallback(async () => {
    await firebase.auth().signOut();
  }, []);
  const initialRender = useRef(true);
  const [modal, setModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [newImageData, setNewImageData] = useState({
    blob: "",
    metadata: {
      contentType: "image/jpeg",
    },
  });
  const [uploadedCroppedImage, setUploadedCroppedImage] = useState("");

  const dropdownOptions = useMemo(
    () => [
      {
        key: "user",
        text: (
          <span>
            Signed in as
            <strong> {currentUser && currentUser.displayName}</strong>
          </span>
        ),
        disabled: true,
      },
      {
        key: "avatar",
        text: <span onClick={() => setModal(true)}>Change Avatar</span>,
      },
      {
        key: "logout",
        text: <span onClick={handleLogout}>Log Out</span>,
      },
    ],
    [handleLogout, currentUser]
  );

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
    }
  };

  const avatarEditor = useRef(null);
  const handleCropImage = () => {
    if (avatarEditor) {
      avatarEditor.current.getImageScaledToCanvas().toBlob((blob) => {
        let imageUrl = URL.createObjectURL(blob);
        setCroppedImage(imageUrl);
        setNewImageData({
          ...newImageData,
          blob,
        });
      });
    }
  };

  const uploadCroppedImage = () => {
    console.log("uploadCroppedImage");
    const userRef = firebase.auth().currentUser;
    const { blob, metadata } = newImageData;
    if (userRef) {
      console.log("storage update");
      storageRef
        .child(`avatars/user-${userRef.uid}`)
        .put(blob, metadata)
        .then((snap) => {
          snap.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            setUploadedCroppedImage(downloadURL);
          });
        });
    }
  };

  const changeAvatar = useCallback(() => {
    const userRef = firebase.auth().currentUser;
    if (userRef && uploadedCroppedImage) {
      // update user profile
      userRef
        .updateProfile({
          photoURL: uploadedCroppedImage,
        })
        .then(() => {
          console.log("Photo url updated");
          setModal(false);
        })
        .catch((err) => {
          console.error(err);
        });

      // update database
      usersRef
        .child(userRef.uid)
        .update({
          avatar: uploadedCroppedImage,
        })
        .then(() => {
          console.log("User avatar updated");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [uploadedCroppedImage]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    changeAvatar();
  }, [changeAvatar]);

  return (
    <Grid>
      <Grid.Column>
        <Grid.Row style={{ padding: "1rem", margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="at" />
            <Header.Content>{config.COMPANY_NAME}</Header.Content>
          </Header>
          <Header inverted style={{ padding: "0.2rem" }} as="h4">
            <Dropdown
              trigger={
                <span>
                  <Image src={currentUser.photoURL} spaced="right" avatar />
                  {currentUser.displayName}
                </span>
              }
              options={dropdownOptions}
            />
          </Header>
        </Grid.Row>

        <Modal basic open={modal} onClose={() => setModal(false)}>
          <Modal.Header>Change Avatar</Modal.Header>
          <Modal.Content>
            <Input
              fluid
              type="file"
              label="New Avatar"
              name="previewImage"
              onChange={handleChange}
            />
            <Grid centered stackable columns={2}>
              <Grid.Row centered>
                <Grid.Column className="ui centered aligned grid">
                  {previewImage && (
                    <AvatarEditor
                      ref={avatarEditor}
                      image={previewImage}
                      width={120}
                      height={120}
                      border={50}
                      scale={1.2}
                    />
                  )}
                </Grid.Column>
                <Grid.Column>
                  {croppedImage && (
                    <Image
                      style={{ margin: "3.5em auto" }}
                      src={croppedImage}
                      width="150"
                      height="150"
                    />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={uploadCroppedImage}>
              <Icon name="save" /> Change Avatar
            </Button>
            <Button color="violet" inverted onClick={handleCropImage}>
              <Icon name="image" /> Preview
            </Button>
            <Button color="red" inverted onClick={() => setModal(false)}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
