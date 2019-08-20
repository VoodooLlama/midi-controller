import { useEffect } from 'react';
import {
    Input,
    InputEvents,
    IMidiChannel,
    InputEventBase,
    InputEventControlchange,
    InputEventProgramchange
} from 'webmidi';
import { useInfoLog } from './useLog';

type InputEventType = keyof InputEvents;
type ValidInputEvents = InputEventControlchange | InputEventProgramchange;
type InputEventCallback = (event: any) => void;
interface IDeviceInputListenerParams {
    callback: InputEventCallback;
    channel?: IMidiChannel;
    eventType?: InputEventType;
    input: Input;
    value: number;
}

export function useDeviceInputListener({
    callback,
    channel = 'all',
    eventType = 'programchange',
    input,
    value
}: IDeviceInputListenerParams) {
    useEffect(() => {
        useInfoLog(
            `Adding ${eventType} event listener for device on channel ${channel}!`
        );

        input.on(eventType, channel, callback);

        return () => {
            useInfoLog(
                `Removing ${eventType} event listener for device on channel ${channel}!`
            );

            input.removeListener(eventType, channel);
        };
    }, [callback, channel, eventType, input, value]);
}
