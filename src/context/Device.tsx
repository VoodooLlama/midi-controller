import React, { createContext, useReducer, useState } from 'react';
import { Input, Output, MidiPort } from 'webmidi';
import { string } from 'prop-types';

interface IDeviceState {
    inputDevices: string[];
    inputDevicesById: Record<string, Input>;
    outputDevices: string[];
    outputDevicesById: Record<string, Output>;
    selectedInputDeviceId: string;
    selectedOutputDeviceId: string;
}

export interface IDeviceContext extends IDeviceState {
    setInputDevices: (inputs: Input[]) => void;
    setOutputDevices: (outputs: Output[]) => void;
    selectInputDevice: (deviceId: string) => void;
}

const initialState: IDeviceContext = {
    inputDevices: [],
    inputDevicesById: {},
    outputDevices: [],
    outputDevicesById: {},
    selectedInputDeviceId: '',
    selectedOutputDeviceId: '',
    setInputDevices: () => {},
    setOutputDevices: () => {},
    selectInputDevice: () => {}
};

enum DEVICE_ACTIONS {
    ADD_INPUT = '@@device/addInput',
    ADD_OUTPUT = '@@device/addOutput',
    SET_INPUTS = '@@device/setInputs',
    SET_OUTPUTS = '@@device/setOutputs',
    SELECT_INPUT = '@@device/selectInput',
    SELECT_OUTPUT = '@@device/selectOutput'
};

export type SetInputDevicesAction = {
    devices: Input[];
    type: DEVICE_ACTIONS.SET_INPUTS
};

export type SetOutputDevicesAction = {
    devices: Output[];
    type: DEVICE_ACTIONS.SET_OUTPUTS;
};

export type SelectInputAction = {
    deviceId: string;
    type: DEVICE_ACTIONS.SELECT_INPUT;
}

type DeviceActions = SetInputDevicesAction
    | SetOutputDevicesAction
    | SelectInputAction;

function deviceReducer(state: IDeviceState = initialState, action: DeviceActions): IDeviceState {
    switch (action.type) {
        case DEVICE_ACTIONS.SET_INPUTS:
            const setInputDeviceIds: string[] = action.devices.map((device: Input) => device.id);
            const setInputDevicesById: Record<string, Input> = action.devices.reduce((deviceMap: Record<string, Input>, device: Input) => {
                return { ...deviceMap, [ device.id ]: device };
            }, {});

            return {
                ...state,
                inputDevices: setInputDeviceIds,
                inputDevicesById: setInputDevicesById
            };
        case DEVICE_ACTIONS.SELECT_INPUT:
            const { deviceId: selectedInputDeviceId } = action;

            return {
                ...state,
                selectedInputDeviceId
            };
        default:
            return state;
    }
}

export const DeviceContext = createContext<IDeviceContext>(initialState);

export const DeviceProvider: React.FC<{}> = ({ children }) => {
    const [state, dispatch ] = useReducer(deviceReducer, initialState);
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

    const devicesContext: IDeviceContext = {
        inputDevices,
        inputDevicesById,
        outputDevices,
        outputDevicesById,
        selectedInputDeviceId,
        selectedOutputDeviceId,

        setInputDevices: dispatchSetInputDevices,
        setOutputDevices: dispatchSetOutputDevices,
        selectInputDevice: dispatchSelectInputDevice
    };

    return (
        <DeviceContext.Provider value={ devicesContext }>
            { children }
        </DeviceContext.Provider>
    );
};
