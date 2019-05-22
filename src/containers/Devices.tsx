import React, { useContext, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import webmidi, { MidiPort, Input, Output, InputEvents } from 'webmidi';
import DeviceList from '../components/DeviceList';
import { IDeviceContext, DeviceContext } from '../context/Device';
import { useProgramChangeInputListener } from '../hooks/useProgamChangeInputListener';

const Devices: React.FC = () => {
    const {
        inputDevices,
        inputDevicesById,
        outputDevices,
        outputDevicesById,
        selectedInputDeviceId,
        selectedOutputDeviceId,
        selectInputDevice,
        selectOutputDevice,
        setInputDevices,
        setOutputDevices
    } = useContext<IDeviceContext>(DeviceContext);

    useProgramChangeInputListener(inputDevicesById[ selectedInputDeviceId ]);
    useEffect(() => {
        function hasDeviceArrayChanged(source: MidiPort[], target: string[]) {
            const currentDevices = source.map(port => port.id).sort();
            const existingDevices = target.sort();

            return currentDevices.some(
                (deviceId, index) => deviceId !== existingDevices[index]
            );
        }

        if (hasDeviceArrayChanged(webmidi.inputs, inputDevices)) {
            console.log('Setting input devices!');

            setInputDevices(webmidi.inputs);
        }

        if (hasDeviceArrayChanged(webmidi.outputs, outputDevices)) {
            console.log('Setting output devices!');

            setOutputDevices(webmidi.outputs);
        }
    }, [webmidi.inputs, webmidi.outputs]);

    const inputs: Input[] = inputDevices.map(
        (deviceId: string) => inputDevicesById[deviceId]
    );
    const outputs: Output[] = outputDevices.map(
        (deviceId: string) => outputDevicesById[deviceId]
    );

    return (
        <section className='device-container'>
            <DeviceList
                devices={inputs}
                title={'Input Devices'}
                selectedDeviceId={selectedInputDeviceId}
                setSelectedDevice={selectInputDevice}
            />
            <DeviceList
                devices={outputs}
                title={'Output Devices'}
                selectedDeviceId={selectedOutputDeviceId}
                setSelectedDevice={selectOutputDevice}
            />
        </section>
    );
};

export default Devices;
