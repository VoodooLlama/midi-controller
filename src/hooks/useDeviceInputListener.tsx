import { useEffect } from 'react';
import {
    Input,
    InputEvents,
    IMidiChannel,
    InputEventBase,
    InputEventControlchange,
    InputEventProgramchange
} from 'webmidi';

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
        console.log(
            `Adding ${eventType} event listener for device on channel ${channel}!`
        );

        input.on(eventType, channel, callback);

        return () => {
            console.log(
                `Removing ${eventType} event listener for device on channel ${channel}!`
            );

            input.removeListener(eventType, channel);
        };
    }, [callback, channel, eventType, input, value]);
}
