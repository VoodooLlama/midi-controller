import { InputEventProgramchange, IMidiChannel, Input } from 'webmidi';
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

export function useProgramChangeInputListener(
    input: Input | undefined,
    channel: number | 'all' = 'all',
    callback = defaultProgramChangeListener
) {
    useEffect(() => {
        if (input) {
            useInfoLog(`Adding event listener for programchange on ${ channel }`);

            input.on('programchange', channel, callback);

            return () => {
                useInfoLog(`Removing event listener for programchange on ${ channel }`);

                input.removeListener('programchange', channel);
            };
        }
    }, [input]);
}

function defaultProgramChangeListener(event: InputEventProgramchange) {
    useInfoLog('PC', `C: ${ event.channel }`, `V: ${ event.value }`);
}
