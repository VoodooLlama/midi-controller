import { Input, Output } from 'webmidi';
import deviceReducer from './device';
import {
    DEVICE_ACTIONS,
    SelectInputAction,
    SetInputDevicesAction,
    SetOutputDevicesAction
} from '../actions/device';

let _: any = undefined;

describe('#deviceReducer', () => {
    it('SET_INPUTS', () => {
        let result;

        expect(
            deviceReducer(_, {
                type: DEVICE_ACTIONS.SET_INPUTS,
                devices: [
                    {
                        id: 'deviceId',
                        manufacturer: 'deviceManufacturer',
                        name: 'deviceName',
                        state: 'disconnected',
                        type: 'input'
                    } as Input
                ]
            } as SetInputDevicesAction)
        ).toMatchSnapshot();
    });

    it('SET_OUTPUTS', () => {
        let result;

        expect(
            deviceReducer(_, {
                type: DEVICE_ACTIONS.SET_OUTPUTS,
                devices: [
                    {
                        id: 'deviceId',
                        manufacturer: 'deviceManufacturer',
                        name: 'deviceName',
                        state: 'disconnected',
                        type: 'output'
                    } as Output
                ]
            } as SetOutputDevicesAction)
        ).toMatchSnapshot();
    });

    it('SELECT_INPUT', () => {
        let result;

        expect(
            deviceReducer(_, {
                type: DEVICE_ACTIONS.SELECT_INPUT,
                deviceId: 'deviceId'
            } as SelectInputAction)
        ).toMatchSnapshot();
    });

    it('SELECT_OUTPUT', () => {
        let result;

        expect(
            deviceReducer(_, {
                type: DEVICE_ACTIONS.SELECT_INPUT,
                deviceId: 'deviceId'
            } as SelectInputAction)
        ).toMatchSnapshot();
    });
});
