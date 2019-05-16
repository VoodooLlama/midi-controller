import { Input, Output } from 'webmidi';

export interface IDeviceState {
    inputDevices: string[];
    inputDevicesById: Record<string, Input>;
    outputDevices: string[];
    outputDevicesById: Record<string, Output>;
    selectedInputDeviceId: string;
    selectedOutputDeviceId: string;
}

export const initialState: IDeviceState = {
    inputDevices: [],
    inputDevicesById: {},
    outputDevices: [],
    outputDevicesById: {},
    selectedInputDeviceId: '',
    selectedOutputDeviceId: ''
};
