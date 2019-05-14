import React, { createContext, useReducer, useState } from 'react';
import { Input, Output, MidiPort } from 'webmidi';
import { string } from 'prop-types';
import { isContext } from 'vm';

export interface IDeviceContext implements IDeviceState {
    setInputDevices: (inputs: Input[]) => any;
}

const initialState: IDeviceState = {
    inputDevices: [],
    inputDevicesById: {},
    outputDevices: [],
    outputDevicesById: {},
    selectedInputDeviceId: '',
    selectedOutputDeviceId: ''
};

export const DeviceContext = createContext<IDeviceContext>(initialState);

enum DEVICE_ACTIONS {
    ADD_INPUT = '@@device/addInput',
    ADD_OUTPUT = '@@device/addOutput',
    SET_INPUTS = '@@device/setInputs',
    SET_OUTPUTS = '@@device/setOutputs'
};

type SetInputsAction = {
    devices: Input[];
    type: DEVICE_ACTIONS.SET_INPUTS
};

type SetOutputsAction = {
    devices: Output[];
    type: DEVICE_ACTIONS.SET_OUTPUTS;
};

type Actions = SetInputsAction | SetOutputsAction;

interface IDeviceState extends Readonly<{
    inputDevices: string[],
    inputDevicesById: Record<string, Input>,
    outputDevices: string[],
    outputDevicesById: Record<string, Output>,
    selectedInputDeviceId: string,
    selectedOutputDeviceId: string
}>

function deviceReducer(state: IDeviceState = initialState, action: Actions): IDeviceState {
    switch (action.type) {
        case DEVICE_ACTIONS.SET_INPUTS:
            const setInputDeviceIds: string[] = action.devices.map((device) => device.id);
            const setInputDevicesById: Record<string, Input> = action.devices.reduce((deviceMap, device) => {
                return { ...deviceMap, [ device.id ]: device };
            }, {});

            return {
                ...state,
                inputDevices: setInputDeviceIds,
                inputDevicesById: setInputDevicesById
            };

        default:
            return state;
    }
}

interface IDeviceProviderProps {
    children?: any;
}

export const DeviceProvider: React.Provider<IDeviceContext> = ({ children }) => {
    const [state, dispatch] = useReducer(deviceReducer, initialState);
    const {
        inputDevices,
        inputDevicesById,
        outputDevices,
        outputDevicesById,
        selectedInputDeviceId,
        selectedOutputDeviceId
    } = state;

    const dispatchSetInputDevices = (devices: Input[]) => {
        dispatch({ devices, type: DEVICE_ACTIONS.SET_INPUTS });
    };
    const dispatchSetOutputDevices = (devices: Output[]) => {
        dispatch({ devices, type: DEVICE_ACTIONS.SET_OUTPUTS });
    };

    const devicesContext: IDeviceContext = {
        inputDevices,
        inputDevicesById,
        outputDevices,
        outputDevicesById,
        selectedInputDeviceId,
        selectedOutputDeviceId
    };

    return <DeviceContext.Provider value={ devicesContext }>{ children }</DeviceContext.Provider>
};
