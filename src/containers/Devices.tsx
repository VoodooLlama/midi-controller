import React, { useContext, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import webmidi, { MidiPort, Input, Output, InputEvents } from 'webmidi';
import DeviceList from '../components/DeviceList';
import { IDeviceContext, DeviceContext } from '../context/Device';
import { useProgramChangeInputListener } from '../hooks/useProgamChangeInputListener';
import { useInfoLog } from '../hooks/useLog';
import { IRootState } from '../state/index';
import { IDeviceState } from 'state/device';
import {
    selectInput,
    selectOutput,
    setInputDevices,
    setOutputDevices,
    DeviceActions
} from '../actions/device';

const Devices: React.FC = () => {
    const log = useInfoLog();
    const dispatch = useDispatch<Dispatch<DeviceActions>>();
    const {
        inputDevices,
        inputDevicesById,
        outputDevices,
        outputDevicesById,
        selectedInputDeviceId,
        selectedOutputDeviceId
    }: IDeviceState = useSelector((state: IRootState) => state.devices);
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
            log('Setting input devices!');

            dispatch(setInputDevices(webmidi.inputs));
        }

        if (hasDeviceArrayChanged(webmidi.outputs, outputDevices)) {
            log('Setting output devices!');

            dispatch(setOutputDevices(webmidi.outputs));
        }
    }, [webmidi.inputs, webmidi.outputs]);

    const inputs: Input[] = inputDevices.map(
        (deviceId: string) => inputDevicesById[deviceId]
    );
    const outputs: Output[] = outputDevices.map(
        (deviceId: string) => outputDevicesById[deviceId]
    );

    const selectInputDevice = (deviceId: string) => {
        dispatch(selectInput(deviceId));
    };

    const selectOutputDevice = (deviceId: string) => {
        dispatch(selectOutput(deviceId));
    }

    return (
        <section className='device-list-container'>
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
