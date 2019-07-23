import { Input, Output } from 'webmidi';

export enum DEVICE_ACTIONS {
    ADD_INPUT = '@@device/addInput',
    ADD_OUTPUT = '@@device/addOutput',
    SET_INPUTS = '@@device/setInputs',
    SET_OUTPUTS = '@@device/setOutputs',
    SELECT_INPUT = '@@device/selectInput',
    SELECT_OUTPUT = '@@device/selectOutput'
}

export type SetInputDevicesAction = {
    devices: Input[];
    type: DEVICE_ACTIONS.SET_INPUTS;
};

export type SetOutputDevicesAction = {
    devices: Output[];
    type: DEVICE_ACTIONS.SET_OUTPUTS;
};

export type SelectInputAction = {
    deviceId: string;
    type: DEVICE_ACTIONS.SELECT_INPUT;
};

export type SelectOutputAction = {
    deviceId: string;
    type: DEVICE_ACTIONS.SELECT_OUTPUT;
};

export type DeviceActions =
    | SetInputDevicesAction
    | SetOutputDevicesAction
    | SelectInputAction
    | SelectOutputAction;

/**
 * Set the currently available MIDI Output Devices
 * @param devices MIDI Input Devices
 */
export function setInputDevices(devices: Input[]): SetInputDevicesAction {
    return {
        devices,
        type: DEVICE_ACTIONS.SET_INPUTS
    };
};

/**
 * Sets the currently available MIDI Output Devices
 * @param devices MIDI Output Devices
 */
export function setOutputDevices(devices: Output[]): SetOutputDevicesAction {
    return {
        devices,
        type: DEVICE_ACTIONS.SET_OUTPUTS
    }
}

/**
 * Selects a MIDI input for use
 * @param deviceId Target MIDI Device ID
 */
export function selectInput(deviceId: string): SelectInputAction {
    return {
        deviceId,
        type: DEVICE_ACTIONS.SELECT_INPUT
    };
}

/**
 * Selects a MIDI output for use
 * @param deviceId Target MIDI Device ID
 */
export function selectOutput(deviceId: string): SelectOutputAction {
    return {
        deviceId,
        type: DEVICE_ACTIONS.SELECT_OUTPUT
    };
}
