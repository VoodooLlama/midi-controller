import { InputEventProgramchange, IMidiChannel, Input } from 'webmidi';
import { useEffect } from 'react';

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
    callback = defaultProgramchangeListener
) {
    useEffect(() => {
        if (input) {
            console.log('Adding event listener for programchange');

            input.addListener('programchange', 'all', callback);

            return () => {
                console.log('Removing event listener for programchange');

                input.removeListener('programchange', 'all');
            };
        }
    }, [input]);
}

function defaultProgramchangeListener(event: InputEventProgramchange) {
    console.log(`PC\t${ event.channel }\t${ event.value }`);
}