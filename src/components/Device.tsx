import * as React from "react";
import * as ReactDOM from "react-dom";
import classnames from 'classnames';
import { MidiPort } from "webmidi";

interface IDeviceProps {
  device: MidiPort;
  selected?: boolean;
  setSelectedDevice: (deviceId: string) => any;
}

const Device: React.FC<IDeviceProps> = ({ device, selected, setSelectedDevice }) => {
  const { connection, id, manufacturer, name } = device;

  const selectDeviceHandler = (event: React.SyntheticEvent) => {
    if (!selected) {
      setSelectedDevice(id);
    }
  };

  const deviceClass = classnames('device', {
    selected
  });

  return (
    <article className={ deviceClass } onClick={ selectDeviceHandler }>
      <h3>{name}</h3>
      <ul>
        <li>Manufacturer: {manufacturer}</li>
        <li>Device ID: {id}</li>
        <li>Connection: {connection}</li>
      </ul>
    </article>
  );
};

export default Device;
