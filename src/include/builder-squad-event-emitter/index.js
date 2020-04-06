import React from "react";
import { connectors } from "./data.json";

const getTimeout = () => {
  return Math.floor(Math.random() * 2500 + 500);
};

const getEventPayload = allowTrolling => {
  const x = Math.floor(Math.random() * 1100 - 100);
  const y = Math.floor(Math.random() * 1100 - 100);

  const connectorIndex = Math.floor(Math.random() * connectors.length);
  const connector =
    allowTrolling && Math.random() * 100 < 10
      ? undefined
      : connectors[connectorIndex];

  const coords =
    allowTrolling && connector && Math.random() * 100 < 10
      ? undefined
      : { x, y };

  const trayTrollSays =
    allowTrolling && connector && coords
      ? undefined
      : "This event brought to you by... Friday Night Deployment!";

  return {
    coords,
    connector,
    trayTrollSays
  };
};

function Emitter(props) {
  const [trayData, updateData] = React.useState(getEventPayload(false));

  const [timeoutHandler, updateTimeoutHandler] = React.useState();

  const delayedEmitEvent = () => {
    updateData(getEventPayload(true));
    updateTimeoutHandler(setTimeout(delayedEmitEvent, getTimeout()));
  };

  React.useEffect(() => {
    updateTimeoutHandler(delayedEmitEvent());

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [connectors]);

  return (
    React.Children.map(props.children, child => {
      return React.cloneElement(child, {
        ...child.props,
        "data-tray": trayData
      });
    }) || null
  );
}

export default Emitter;
