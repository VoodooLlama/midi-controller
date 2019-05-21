import { IMidiChannel } from 'webmidi';
import { IMIDIControlMap } from '../types/ControlChangeMap';

export interface IPedal {
    id: string;
    name: string;
    description: string;
    manufacturer: string;
    listenChannel: IMidiChannel;
    ccMap: IMIDIControlMap;
}
