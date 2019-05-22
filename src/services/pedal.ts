import { IPedal } from '../state/pedal';
import pedalExampleJSON from '../../devices.json';

interface IPedalJSONSchema {
    devices: IPedal[];
}

export function retrievePedalData(): Promise<IPedalJSONSchema> {
    return Promise.resolve(pedalExampleJSON);
}
