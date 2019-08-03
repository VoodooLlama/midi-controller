import React, { useContext, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import webmidi from 'webmidi';
import { DeviceContext } from '../context/Device';
import { useInfoLog, useWarningLog } from './useLog';

const warn = useWarningLog();
const info = useInfoLog();

function useEnableWebMIDI(): boolean {
    const [enabled, setEnabledState] = useState<boolean>(false);

    useEffect(() => {
        function onStatusChange(err?: Error) {
            if (err) {
                warn('An error occured connecting to MIDI devices!');

                setEnabledState(false);
            }

            info('Enabled WebMIDI!');

            setEnabledState(true);
        }

        webmidi.enable(onStatusChange, true);

        return () => {
            info('Disabling WebMIDI!');

            webmidi.disable();
        };
    }, []);

    return enabled;
}

export default useEnableWebMIDI;
