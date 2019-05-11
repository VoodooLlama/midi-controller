import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Device from '../components/Device';
import webmidi, { MidiPort } from 'webmidi';

const deviceArray = (devices: MidiPort[]) => {
    if (!devices.length) {
        return 'No Input Devices Connected!';
    }

    return devices.map((device: MidiPort) =>
        <Device device={ device } key={ device.id } />
    );
}

const Input = () => {
    const { inputs, outputs } = webmidi;

    return (
        <>
            <h1>Input Devices:</h1>
            { deviceArray(inputs) }
            <h1>Output Devices:</h1>
            { deviceArray(outputs) }
        </>
    );
};

export default Input;
