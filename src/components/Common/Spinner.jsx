import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => {
  return (
    <Dimmer active>
      <Loader size="large">Preparing for chat</Loader>
    </Dimmer>
  );
};

export default Spinner;
