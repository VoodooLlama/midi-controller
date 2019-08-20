import React, { useContext, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import webmidi from 'webmidi';
import { DeviceContext } from '../context/Device';
import { useInfoLog, useWarningLog } from './useLog';

function useEnableWebMIDI(): boolean {
    const [enabled, setEnabledState] = useState<boolean>(false);

    useEffect(() => {
        function onStatusChange(err?: Error) {
            if (err) {
                useWarningLog('An error occured connecting to MIDI devices!');

                setEnabledState(false);
            }

            useInfoLog('Enabled WebMIDI!');

            setEnabledState(true);
        }

        webmidi.enable(onStatusChange, true);

        return () => {
            useInfoLog('Disabling WebMIDI!');

            webmidi.disable();
        };
    }, []);

    return enabled;
}

export default useEnableWebMIDI;
