import { IMidiChannel } from 'webmidi';
import { IMIDIControlChangeEntry } from '../types/ControlChange';

export interface IPedal {
    id: string;
    name: string;
    description: string;
    manufacturer: string;
    listenChannel: IMidiChannel;
    ccValues: IMIDIControlChangeEntry[];
}
