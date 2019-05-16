import { MidiPort } from "webmidi";
import React, { Dispatch } from 'react';
import Device from './Device';

interface IDeviceListProps {
    devices: MidiPort[];
    selectedDeviceId: string;
    setSelectedDevice: (deviceId: string) => void;
    title: string;
}

const DeviceList: React.FC<IDeviceListProps> = ({ devices, selectedDeviceId, setSelectedDevice, title }) => {
    if (!devices.length) {
        return <>No Devices Connected!</>;
    }

    return (
        <React.Fragment>
            <h1 className='title'>{ title }</h1>
            <div className='container'>
                {
                    devices.map((device: MidiPort) =>
                        <Device
                            key={ device.id }
                            device={ device }
                            selectedDeviceId={ selectedDeviceId }
                            setSelectedDevice={ setSelectedDevice } />
                    )
                }
            </div>
        </React.Fragment>
    );
};

export default DeviceList;
