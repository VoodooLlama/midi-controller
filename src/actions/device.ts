import { Input, Output } from 'webmidi';

export enum DEVICE_ACTIONS {
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

export type SelectOutputAction = {
    deviceId: string;
    type: DEVICE_ACTIONS.SELECT_OUTPUT;
}

export type DeviceActions = SetInputDevicesAction
    | SetOutputDevicesAction
    | SelectInputAction
    | SelectOutputAction;
