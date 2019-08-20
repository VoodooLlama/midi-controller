import { InputEventControlchange, IMidiChannel, Input } from 'webmidi';
import { useEffect } from 'react';
import { useInfoLog } from './useLog';

/**
 * Channel-specific MIDI events: noteoff, noteon, keyaftertouch,
 * controlchange, channelmode, programchange, channelaftertouch, pitchbend
 *
 * Input-wide MIDI events: sysex, timecode, songposition, songselect,
 * tuningrequest, clock, start, continue, stop, activesensing, reset,
 * midimessage, unknownsystemmessage
 */

export function useControlChangeInputListener(
    input?: Input,
    channel: string = 'all',
    callback = defaultProgramChangeListener
) {
    useEffect(() => {
        if (input) {
            useInfoLog(`Adding event listener for controlchange on ${ channel }`);

            input.on('controlchange', channel, callback);

            return () => {
                useInfoLog(`Removing event listener for controlchange on ${ channel }`);

                input.removeListener('controlchange', channel);
            };
        }
    }, []);
}

function defaultProgramChangeListener(event: InputEventControlchange) {
    useInfoLog('CC', event.channel, event.value);
}
