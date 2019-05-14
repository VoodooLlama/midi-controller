import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import webmidi, { MidiPort } from 'webmidi';
import DeviceList from '../components/DeviceList';

const Devices: React.FC = () => {
    const { inputs, outputs } = webmidi;
    const [selectedInputDevice, setSelectedInputDevice] = useState<string>('');
    const [selectedOutputDevice, setSelectedOutputDevice] = useState<string>('');

    return (
        <section className='device-container'>
            <DeviceList
                devices={ inputs }
                title={ 'Input Devices' }
                selectedDeviceId={ selectedInputDevice }
                setSelectedDevice={ setSelectedInputDevice } />
            <DeviceList
                devices={ outputs }
                title={ 'Output Devices' }
                selectedDeviceId={ selectedOutputDevice }
                setSelectedDevice={ setSelectedOutputDevice } />
        </section>

    );
};

export default Devices;
