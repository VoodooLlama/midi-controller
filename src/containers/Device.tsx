import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import Device from '../components/Device';
import webmidi, { MidiPort } from 'webmidi';
import DeviceList from '../components/DeviceList';
import useInputDeviceSelection from '../hooks/useInputDeviceSelection';
import useOutputDeviceSelection from '../hooks/useOutputDeviceSelection';

const Devices: React.FC = () => {
    const { inputs, outputs } = webmidi;
    const [selectedInputDevice, setSelectedInputDevice] = useInputDeviceSelection();
    const [selectedOutputDevice, setSelectedOutputDevice] = useOutputDeviceSelection();

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
