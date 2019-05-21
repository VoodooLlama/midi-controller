import { MidiPort } from 'webmidi';
import React, { Dispatch } from 'react';
import Device from './Device';

interface IDeviceListProps {
    devices: MidiPort[];
    selectedDeviceId: string;
    setSelectedDevice: (deviceId: string) => void;
    title: string;
}

const DeviceList: React.FC<IDeviceListProps> = ({
    devices,
    selectedDeviceId,
    setSelectedDevice,
    title
}) => {
    if (!devices.length) {
        return <h1 className='title'>{`No ${title} Connected!`}</h1>;
    }

    const renderDevices = () => {
        return devices.map((device: MidiPort) => (
            <Device
                key={device.id}
                device={device}
                selectedDeviceId={selectedDeviceId}
                setSelectedDevice={setSelectedDevice}
            />
        ));
    }

    return (
        <div className='device-list'>
            <h1 className='title'>{title}</h1>
            <div className='device-list-container'>
                {renderDevices()}
            </div>
        </div>
    );
};

export default DeviceList;
