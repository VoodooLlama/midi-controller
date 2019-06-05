import React, { createContext, useReducer, useState } from 'react';
import { Input, Output, MidiPort } from 'webmidi';
import { string } from 'prop-types';
import deviceReducer from '../reducers/device';
import { DEVICE_ACTIONS } from '../actions/device';
import { IDeviceState, initialState } from '../state/device';

export interface IDeviceContext extends IDeviceState {
    setInputDevices: (inputs: Input[]) => void;
    setOutputDevices: (outputs: Output[]) => void;
    selectInputDevice: (deviceId: string) => void;
    selectOutputDevice: (deviceId: string) => void;
}

export const initialContext: IDeviceContext = {
    ...initialState,
    setInputDevices: () => {},
    setOutputDevices: () => {},
    selectInputDevice: () => {},
    selectOutputDevice: () => {}
};

export const DeviceContext = createContext<IDeviceContext>(initialContext);

export const DeviceProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(deviceReducer, initialState);
    const {
        inputDevices,
        inputDevicesById,
        outputDevices,
        outputDevicesById,
        selectedInputDeviceId,
        selectedOutputDeviceId
    } = state;

    const dispatchSetInputDevices = (devices: Input[]) =>
        dispatch({ devices, type: DEVICE_ACTIONS.SET_INPUTS });
    const dispatchSetOutputDevices = (devices: Output[]) =>
        dispatch({ devices, type: DEVICE_ACTIONS.SET_OUTPUTS });
    const dispatchSelectInputDevice = (deviceId: string) =>
        dispatch({ deviceId, type: DEVICE_ACTIONS.SELECT_INPUT });
    const dispatchSelectOutputDevice = (deviceId: string) =>
        dispatch({ deviceId, type: DEVICE_ACTIONS.SELECT_OUTPUT });

    const devicesContext: IDeviceContext = {
        inputDevices,
        inputDevicesById,
        outputDevices,
        outputDevicesById,
        selectedInputDeviceId,
        selectedOutputDeviceId,

        setInputDevices: dispatchSetInputDevices,
        setOutputDevices: dispatchSetOutputDevices,
        selectInputDevice: dispatchSelectInputDevice,
        selectOutputDevice: dispatchSelectOutputDevice
    };

    return (
        <DeviceContext.Provider value={devicesContext}>
            {children}
        </DeviceContext.Provider>
    );
};
