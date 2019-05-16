import { Input, Output } from 'webmidi';
import { DEVICE_ACTIONS, DeviceActions } from '../actions/device';
import { initialState, IDeviceState } from '../state/device';

export default function deviceReducer(
    state: IDeviceState = initialState,
    action: DeviceActions
): IDeviceState {
    switch (action.type) {
        case DEVICE_ACTIONS.SET_INPUTS:
            const { devices: setInputInitialDevices } = action;
            const setInputDeviceIds: string[] = setInputInitialDevices.map(
                (device: Input) => device.id
            );
            const setInputDevicesById: Record<
                string,
                Input
            > = setInputInitialDevices.reduce(
                (deviceMap: Record<string, Input>, device: Input) => {
                    return { ...deviceMap, [device.id]: device };
                },
                {}
            );

            return {
                ...state,
                inputDevices: setInputDeviceIds,
                inputDevicesById: setInputDevicesById
            };
        case DEVICE_ACTIONS.SET_OUTPUTS:
            const { devices: setOutputInitialDevices } = action;
            const setOutputDeviceIds: string[] = setOutputInitialDevices.map(
                (device: Output) => device.id
            );
            const setOutputDevicesById: Record<
                string,
                Output
            > = setOutputInitialDevices.reduce(
                (deviceMap: Record<string, Output>, device: Output) => {
                    return { ...deviceMap, [device.id]: device };
                },
                {}
            );

            return {
                ...state,
                outputDevices: setOutputDeviceIds,
                outputDevicesById: setOutputDevicesById
            };
        case DEVICE_ACTIONS.SELECT_INPUT:
            const { deviceId: selectedInputDeviceId } = action;

            return {
                ...state,
                selectedInputDeviceId
            };
        case DEVICE_ACTIONS.SELECT_OUTPUT:
            const { deviceId: selectedOutputDeviceId } = action;

            return {
                ...state,
                selectedOutputDeviceId
            };
        default:
            return state;
    }
}
