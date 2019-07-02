import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Input, MidiPort, Output } from 'webmidi';
import { DeviceContext } from '../context/Device';

interface IDeviceProps {
    device: MidiPort;
    selectedDeviceId: string;
    setSelectedDevice: (deviceId: string) => void;
}

const Device: React.FC<IDeviceProps> = ({
    device,
    setSelectedDevice,
    selectedDeviceId
}) => {
    const [isExpanded, setExpandedState] = useState(false);
    const { connection, id, manufacturer, name } = device;
    const selected = selectedDeviceId === id;
    const deviceClass = classnames('device', {
        selected
    });
    const detailsClass = classnames('details', {
        hidden: !isExpanded
    });

    function toggleExpandedState() {
        setExpandedState(!isExpanded);
    }

    function getExpandButtonText() {
        return isExpanded ? 'Hide' : 'Show';
    }

    const selectDeviceHandler = () => {
        if (!selected) {
            setSelectedDevice(id);
        }
    };

    return (
        <article className={deviceClass} onClick={selectDeviceHandler}>
            <h3>{name}</h3>
            <ul className={detailsClass}>
                <li>Manufacturer: {manufacturer}</li>
                <li>Device ID: {id}</li>
                <li>Connection: {connection}</li>
            </ul>
            <button onClick={toggleExpandedState}>
                {getExpandButtonText()}
            </button>
        </article>
    );
};

export default Device;
