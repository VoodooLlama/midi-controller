import React, { useContext, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import webmidi from 'webmidi';
import { DeviceContext } from '../context/Device';

function useEnableWebMIDI(): boolean {
    const [enabled, setEnabledState] = useState<boolean>(false);

    useEffect(() => {
        function onStatusChange(err?: Error) {
            if (err) {
                console.warn('An error occured connecting to MIDI devices!');

                setEnabledState(false);
            }

            console.log('Enabled WebMIDI!');

            setEnabledState(true);
        }

        webmidi.enable(onStatusChange, true);

        return () => {
            webmidi.disable();
        };
    }, []);

    return enabled;
}

export default useEnableWebMIDI;
