import * as React from "react";
import * as ReactDOM from "react-dom";
import { MidiPort } from "webmidi";

interface IDeviceProps {
  device: MidiPort;
}

const Device: React.FC<IDeviceProps> = ({ device }) => {
  const { connection, id, manufacturer, name } = device;

  return (
    <section className="midi-device">
      <h3>{name}</h3>
      <ul>
        <li>Manufacturer: {manufacturer}</li>
        <li>Device ID: {id}</li>
        <li>Connection: {connection}</li>
      </ul>
    </section>
  );
};

export default Device;
